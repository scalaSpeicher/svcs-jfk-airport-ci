<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * App\Models\AirlineData
 *
 * @method static \Illuminate\Database\Eloquent\Builder|AirlineData newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AirlineData newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AirlineData query()
 */
	class AirlineData extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\AirlinesBasic
 *
 * @property int $id
 * @property string $iata
 * @property string $icao
 * @property string $name
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\AirlinesBranding|null $airlinesBranding
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\AirlinesLabelsLid> $airlinesLabelsLids
 * @property-read int|null $airlines_labels_lids_count
 * @property-read mixed $brand_store
 * @property-read mixed $permission_name
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBasic newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBasic newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBasic query()
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBasic whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBasic whereIata($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBasic whereIcao($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBasic whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBasic whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBasic whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBasic whereUpdatedAt($value)
 */
	class AirlinesBasic extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\AirlinesBranding
 *
 * @property int $id
 * @property int $airlines_basic_id
 * @property string|null $mode
 * @property string|null $primary_color
 * @property string|null $secondary_color
 * @property string|null $tertiary_color
 * @property string|null $font
 * @property string|null $font_color_primary
 * @property string|null $font_color_secondary
 * @property string|null $ssbd_logo
 * @property string|null $fids_color
 * @property string|null $logo_small_white
 * @property string|null $logo_small_color
 * @property string|null $logo_large_white
 * @property string|null $logo_large_color
 * @property string|null $lids_logo_large
 * @property string|null $endcap_fids_logo_small_color
 * @property string|null $wayfinding_arrow_color
 * @property string|null $brand_accent_image
 * @property string|null $lids_background_color
 * @property string|null $lids_status_bar_color
 * @property string|null $updated_at
 * @property int|null $updated_by
 * @property-read \App\Models\AirlinesBasic|null $airlines
 * @property-read mixed $brand_store
 * @property-read mixed $permission_name
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding query()
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding whereAirlinesBasicId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding whereBrandAccentImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding whereEndcapFidsLogoSmallColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding whereFidsColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding whereFont($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding whereFontColorPrimary($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding whereFontColorSecondary($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding whereLidsBackgroundColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding whereLidsLogoLarge($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding whereLidsStatusBarColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding whereLogoLargeColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding whereLogoLargeWhite($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding whereLogoSmallColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding whereLogoSmallWhite($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding whereMode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding wherePrimaryColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding whereSecondaryColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding whereSsbdLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding whereTertiaryColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding whereUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesBranding whereWayfindingArrowColor($value)
 */
	class AirlinesBranding extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\AirlinesLabelsLid
 *
 * @property int $id
 * @property string $label
 * @property string|null $class_code
 * @property string|null $created_at
 * @property int|null $created_by
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\AirlinesBasic> $airlines
 * @property-read int|null $airlines_count
 * @property-read mixed $permission_name
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesLabelsLid newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesLabelsLid newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesLabelsLid query()
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesLabelsLid whereClassCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesLabelsLid whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesLabelsLid whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesLabelsLid whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AirlinesLabelsLid whereLabel($value)
 */
	class AirlinesLabelsLid extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ApiRequestLog
 *
 * @property int $id
 * @property int|null $user_id
 * @property int|null $personal_access_token_id
 * @property string $auth_method
 * @property array|null $request_data
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|ApiRequestLog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ApiRequestLog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ApiRequestLog query()
 * @method static \Illuminate\Database\Eloquent\Builder|ApiRequestLog whereAuthMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApiRequestLog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApiRequestLog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApiRequestLog wherePersonalAccessTokenId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApiRequestLog whereRequestData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApiRequestLog whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ApiRequestLog whereUserId($value)
 */
	class ApiRequestLog extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\AuditTrail
 *
 * @property int $id
 * @property string $reference_table
 * @property int $reference_id
 * @property string $actor
 * @property string $data
 * @property string $audit_changes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read string $actor_email
 * @property-read string $permission_name
 * @property-read string $user_email
 * @method static \Illuminate\Database\Eloquent\Builder|AuditTrail newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AuditTrail newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AuditTrail query()
 * @method static \Illuminate\Database\Eloquent\Builder|AuditTrail whereActor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AuditTrail whereAuditChanges($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AuditTrail whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AuditTrail whereData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AuditTrail whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AuditTrail whereReferenceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AuditTrail whereReferenceTable($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AuditTrail whereUpdatedAt($value)
 */
	class AuditTrail extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Counter
 *
 * @property int $id
 * @property int $counter_location
 * @property int $row
 * @property string|null $position
 * @property int $width
 * @property string $type
 * @property string|null $updated_at
 * @property int|null $updated_by
 * @property-read mixed $permission_name
 * @method static \Illuminate\Database\Eloquent\Builder|Counter newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Counter newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Counter query()
 * @method static \Illuminate\Database\Eloquent\Builder|Counter whereCounterLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Counter whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Counter wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Counter whereRow($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Counter whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Counter whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Counter whereUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Counter whereWidth($value)
 */
	class Counter extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Destination
 *
 * @property int $id
 * @property string $iata
 * @property string $icao
 * @property string $city
 * @property string $airport_name
 * @property string $country
 * @property string $country_code
 * @property float $latitude
 * @property float $longitude
 * @property string $status
 * @property int|null $created_by
 * @property int|null $updated_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $permission_name
 * @method static \Illuminate\Database\Eloquent\Builder|Destination newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Destination newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Destination query()
 * @method static \Illuminate\Database\Eloquent\Builder|Destination whereAirportName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Destination whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Destination whereCountry($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Destination whereCountryCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Destination whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Destination whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Destination whereIata($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Destination whereIcao($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Destination whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Destination whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Destination whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Destination whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Destination whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Destination whereUpdatedBy($value)
 */
	class Destination extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Location
 *
 * @property int $id
 * @property string $name
 * @property int $dynamic
 * @property int $slots
 * @property mixed|null $content
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read string $permission_name
 * @method static \Database\Factories\LocationFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Location newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Location newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Location query()
 * @method static \Illuminate\Database\Eloquent\Builder|Location whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Location whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Location whereDynamic($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Location whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Location whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Location whereSlots($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Location whereUpdatedAt($value)
 */
	class Location extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ManualOverride
 *
 * @property int $id
 * @property string $checkindesk
 * @property string $flight_identity
 * @property string $checkin_plan_close_date_time
 * @property string $checkin_plan_open_date_time
 * @property string|null $flight_origin_date
 * @property string|null $checkin_close_date_time
 * @property string|null $checkin_open_date_time
 * @property string|null $class_code
 * @property int|null $overridden_by
 * @property int $deletion
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read string $actor_email
 * @property-read mixed $airlines
 * @property-read mixed $iata
 * @property-read mixed $label
 * @property-read mixed $overridden_by_name
 * @property-read mixed $permission_name
 * @property-read \App\Models\Planner|null $planners
 * @method static \Illuminate\Database\Eloquent\Builder|ManualOverride newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ManualOverride newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ManualOverride query()
 * @method static \Illuminate\Database\Eloquent\Builder|ManualOverride whereCheckinCloseDateTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManualOverride whereCheckinOpenDateTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManualOverride whereCheckinPlanCloseDateTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManualOverride whereCheckinPlanOpenDateTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManualOverride whereCheckindesk($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManualOverride whereClassCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManualOverride whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManualOverride whereDeletion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManualOverride whereFlightIdentity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManualOverride whereFlightOriginDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManualOverride whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManualOverride whereOverriddenBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ManualOverride whereUpdatedAt($value)
 */
	class ManualOverride extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Membership
 *
 * @property int $id
 * @property int $team_id
 * @property int $user_id
 * @property string|null $role
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $email
 * @property-read mixed $name
 * @property-read mixed $profile_photo_url
 * @property-read \App\Models\Team|null $team
 * @method static \Illuminate\Database\Eloquent\Builder|Membership newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Membership newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Membership query()
 * @method static \Illuminate\Database\Eloquent\Builder|Membership whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Membership whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Membership whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Membership whereTeamId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Membership whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Membership whereUserId($value)
 */
	class Membership extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Message
 *
 * @property int $id
 * @property array|null $json_data
 * @property int $locked_by
 * @property int $new
 * @property array|null $preview_data
 * @property string|null $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read string $locked_by_email
 * @property-read string $permission_name
 * @property-read string $template_name
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Template> $templates
 * @property-read int|null $templates_count
 * @method static \Database\Factories\MessageFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Message newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Message newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Message query()
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereJsonData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereLockedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereNew($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message wherePreviewData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Message whereUpdatedAt($value)
 */
	class Message extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Permission
 *
 * @property int $id
 * @property string $name
 * @property string $guard_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $permission_name
 * @method static \Illuminate\Database\Eloquent\Builder|Permission newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Permission newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Permission query()
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereGuardName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Permission whereUpdatedAt($value)
 */
	class Permission extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Planner
 *
 * @property int $id
 * @property string $checkindesk
 * @property string $flight_identity
 * @property string $checkin_plan_close_date_time
 * @property string $checkin_plan_open_date_time
 * @property string|null $flight_origin_date
 * @property string|null $checkin_close_date_time
 * @property string|null $checkin_open_date_time
 * @property string|null $class_code
 * @property int|null $manual_override_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $airlines
 * @property-read mixed $converted_close
 * @property-read mixed $converted_open
 * @property-read mixed $iata
 * @property-read mixed $label
 * @property-read mixed $manual_override
 * @property-read mixed $permission_name
 * @property-read mixed $updated_by_name
 * @property-read \App\Models\ManualOverride|null $manualOverrides
 * @method static \Illuminate\Database\Eloquent\Builder|Planner betweenDates(array $dates, string $field)
 * @method static \Illuminate\Database\Eloquent\Builder|Planner newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Planner newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Planner query()
 * @method static \Illuminate\Database\Eloquent\Builder|Planner whereCheckinCloseDateTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Planner whereCheckinOpenDateTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Planner whereCheckinPlanCloseDateTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Planner whereCheckinPlanOpenDateTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Planner whereCheckindesk($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Planner whereClassCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Planner whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Planner whereFlightIdentity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Planner whereFlightOriginDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Planner whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Planner whereManualOverrideId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Planner whereUpdatedAt($value)
 */
	class Planner extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Role
 *
 * @property int $id
 * @property int|null $team_id
 * @property string $name
 * @property string $guard_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $permission_name
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Permission> $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder|Role newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Role newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Role permission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder|Role query()
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereGuardName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereTeamId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereUpdatedAt($value)
 */
	class Role extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Schedule
 *
 * @property int $id
 * @property string $name
 * @property string $status
 * @property string|null $open
 * @property string|null $close
 * @property int $days
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read string $permission_name
 * @method static \Database\Factories\ScheduleFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Schedule newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Schedule newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Schedule query()
 * @method static \Illuminate\Database\Eloquent\Builder|Schedule whereClose($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Schedule whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Schedule whereDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Schedule whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Schedule whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Schedule whereOpen($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Schedule whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Schedule whereUpdatedAt($value)
 */
	class Schedule extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Team
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property bool $personal_team
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $permission_name
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\TeamInvitation> $invitations
 * @property-read int|null $invitations_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Membership> $memberships
 * @property-read int|null $memberships_count
 * @property-read \App\Models\User $owner
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\TeamInvitation> $teamInvitations
 * @property-read int|null $team_invitations_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\User> $users
 * @property-read int|null $users_count
 * @method static \Database\Factories\TeamFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Team newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Team newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Team query()
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team wherePersonalTeam($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Team whereUserId($value)
 */
	class Team extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TeamInvitation
 *
 * @property int $id
 * @property int $team_id
 * @property string $email
 * @property string|null $role
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Team $team
 * @method static \Illuminate\Database\Eloquent\Builder|TeamInvitation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TeamInvitation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TeamInvitation query()
 * @method static \Illuminate\Database\Eloquent\Builder|TeamInvitation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TeamInvitation whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TeamInvitation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TeamInvitation whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TeamInvitation whereTeamId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TeamInvitation whereUpdatedAt($value)
 */
	class TeamInvitation extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Template
 *
 * @property int $id
 * @property string $name
 * @property string|null $category
 * @property string|null $description
 * @property string|null $thumbnail
 * @property string|null $full_url
 * @property int $manifest_verified
 * @property string|null $manifest_errors
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\TemplateField> $fields
 * @property-read int|null $fields_count
 * @property-read mixed $manifest
 * @property-read string $permission_name
 * @property-read mixed $template_store
 * @property-read mixed $thumbnail_photo_url
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Message> $messages
 * @property-read int|null $messages_count
 * @method static \Database\Factories\TemplateFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|Template newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Template newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Template query()
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereFullUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereManifestErrors($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereManifestVerified($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereThumbnail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Template whereUpdatedAt($value)
 */
	class Template extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TemplateField
 *
 * @property int $id
 * @property string $name
 * @property string $type
 * @property string|null $label
 * @property bool $required
 * @property array|null $json_data
 * @property int|null $max
 * @property int|null $min
 * @property int|null $lines
 * @property string $default
 * @property bool $internal
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Template> $template
 * @property-read int|null $template_count
 * @method static \Illuminate\Database\Eloquent\Builder|TemplateField newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TemplateField newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TemplateField query()
 * @method static \Illuminate\Database\Eloquent\Builder|TemplateField whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TemplateField whereDefault($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TemplateField whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TemplateField whereInternal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TemplateField whereJsonData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TemplateField whereLabel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TemplateField whereLines($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TemplateField whereMax($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TemplateField whereMin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TemplateField whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TemplateField whereRequired($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TemplateField whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TemplateField whereUpdatedAt($value)
 */
	class TemplateField extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TemplateFieldField
 *
 * @method static \Illuminate\Database\Eloquent\Builder|TemplateFieldField newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TemplateFieldField newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TemplateFieldField query()
 */
	class TemplateFieldField extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\User
 *
 * @property int $id
 * @property string $first_name
 * @property string $last_name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $two_factor_secret
 * @property string|null $two_factor_recovery_codes
 * @property string|null $two_factor_confirmed_at
 * @property string $status
 * @property string|null $remember_token
 * @property int|null $current_team_id
 * @property string|null $profile_photo_path
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\AirlinesBasic> $airlines
 * @property-read int|null $airlines_count
 * @property-read \App\Models\Team|null $currentTeam
 * @property-read mixed $all_permissions
 * @property-read mixed $permission_name
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Team> $ownedTeams
 * @property-read int|null $owned_teams_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Permission> $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Role> $roles
 * @property-read int|null $roles_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Team> $teams
 * @property-read int|null $teams_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Sanctum\PersonalAccessToken> $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User permission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User role($roles, $guard = null)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCurrentTeamId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereProfilePhotoPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereTwoFactorConfirmedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereTwoFactorRecoveryCodes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereTwoFactorSecret($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

