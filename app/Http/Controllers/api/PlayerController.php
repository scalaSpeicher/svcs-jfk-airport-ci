<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MessageData;
use App\Models\AirlinesBasic;
use App\Models\Message;
use App\Models\Template;
use Exception;

class PlayerController extends Controller
{
    public function messageDefault(MessageData $request)
    {
        try {
            $params = $request->query();
            $template = Template::where('id', $params['template_id'])->first();
            $playerMessage = $template->generateDefaultMessage();
            $playerMessage->templateId = $template->id;

            return response()->json($playerMessage);
        } catch (Exception $e) {
            return response()->json($this->exceptionResponse($e));
        }
    }

    public function messageData(MessageData $request)
    {
        try {
            $params = $request->query();
            $message = Message::where('id', $params['message_id'])->first();
            $template = $message->templates()->first();
            $playerMessage = $template->generateMessageData($message, true);
            $playerMessage->templateId = $template->id;

            return response()->json($playerMessage);
        } catch (Exception $e) {
            return response()->json($this->exceptionResponse($e));
        }
    }

    public function airlineData()
    {
        try {
            $airlineData = AirlinesBasic::all();

            return response()->json($airlineData);
        } catch (Exception $e) {
            return response()->json($this->exceptionResponse($e));
        }
    }

    public function exceptionResponse($exception)
    {
        return [
            'success' => false,
            'message' => $exception->getMessage() . ' in file ' . $exception->getFile() . ' on line number: ' . $exception->getLine(),
            'data' => [],
        ];
    }
}
