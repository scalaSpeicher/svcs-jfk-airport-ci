<?php

namespace App\Http\Controllers;

use App\Models\AuditTrail;
use App\Services\HelperMethods;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class AuditController extends Controller
{
    protected $helperMethodsObj;

    public function __construct(HelperMethods $helperMethodsObj)
    {
        $this->helperMethodsObj = $helperMethodsObj;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $itemsPerPage = $this->helperMethodsObj->getItemsPerPageCookie($request);
        $audits = AuditTrail::query()
            ->when($request->input('search'), function ($query, $search): void {
                $query
                    ->where('actor', 'like', "%{$search}%")
                    ->orWhere('data', 'like', "%{$search}%")
                    ->orWhere('audit_changes', 'like', "%{$search}%");
            })
            ->when($request->input('sort'), function ($query, $sortAttribute): void {

                $sortOrder = 'ASC';
                if (strncmp($sortAttribute, '-', 1) === 0) {
                    $sortOrder = 'DESC';
                    $sortAttribute = mb_substr($sortAttribute, 1);
                }
                $query
                    ->orderBy($sortAttribute, $sortOrder);
            })
            ->paginate($itemsPerPage)
            ->withQueryString();

        return Inertia::render(
            'Audits/Index',
            [
                'audits' => $audits,
                'canReadAudits' => Gate::allows('audits.index'),
                'isSuperAdmin' => Gate::allows('super-admin'),
                'filters' => $request->only(['search']),
            ]
        );
    }
}
