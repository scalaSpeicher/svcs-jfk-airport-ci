<script setup>
import { ref } from 'vue';
import { Head, Link, router } from '@inertiajs/vue3';
import ApplicationMark from '@/Components/ApplicationMark.vue';
import Banner from '@/Components/Banner.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import NavLink from '@/Components/NavLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';

const props = defineProps({
    userData: {
        type: Array,
        default: () => ([]),
    },
    title: {
        type: String,
        default: () => '',
    },
});

const showingNavigationDropdown = ref(false);

const switchToTeam = (team) => {
    router.put(route('current-team.update'), {
        team_id: team.id,
    }, {
        preserveState: false,
    });
};

const logout = () => {
    router.post(route('logout'));
};

</script>

<template>
    <div>
        <Head :title="title" />

        <Banner />

        <div class="min-h-screen bg-gray-100">
            <nav class="bg-white border-b border-gray-100">
                <!-- Primary Navigation Menu -->
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-16">
                        <div class="flex">
                            <div class="shrink-0 flex items-center">
                                <Link :href="route('planners.index',{_query:{today_only:0,search_by:'open',active_only:1,sort:'checkindesk'}})">
                                    <ApplicationMark class="block h-9 w-auto" />
                                </Link>
                            </div>

                            <!-- Navigation Links -->
                            <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink
                                    v-show="$page.props.userData.canReadPlanners"
                                    v-tippy="'Airport counter planning.'"
                                    :href="route('planners.index',{_query:{today_only:0,search_by:'open',active_only:1,sort:'checkindesk'}})"
                                    :active="route().current('planners.*')"
                                >
                                    Plan
                                </NavLink>
                                <NavLink
                                    v-show="$page.props.userData.canReadCounters"
                                    v-tippy="'Current counters.'"
                                    :href="route('counters.index')"
                                    :active="route().current('counters.*')"
                                >
                                    Count
                                </NavLink>
                                <NavLink
                                    v-show="$page.props.userData.canReadDestinations"
                                    v-tippy="'Airport destinations.'"
                                    :href="route('destinations.index')"
                                    :active="route().current('destinations.*')"
                                >
                                    Dest
                                </NavLink>
                                <NavLink
                                    v-show="$page.props.userData.canReadAirlines"
                                    v-tippy="'Airport airlines.'"
                                    :href="route('airlines.index')"
                                    :active="route().current('airlines.*')"
                                >
                                    Air
                                </NavLink>
                                <NavLink
                                    v-show="$page.props.userData.canReadUsers"
                                    v-tippy="'User accounts.'"
                                    :href="route('users.index')"
                                    :active="route().current('users.*')"
                                >
                                    User
                                </NavLink>
                                <NavLink
                                    v-show="$page.props.userData.canReadRoles"
                                    v-tippy="'User roles and permissions.'"
                                    :href="route('roles.index')"
                                    :active="route().current('roles.index')"
                                >
                                    Role
                                </NavLink>
                                <NavLink
                                    v-show="$page.props.userData.canReadSchedules"
                                    v-tippy="'Schedules.'"
                                    :href="route('schedules.index')"
                                    :active="route().current('schedules.index')"
                                >
                                    Sched
                                </NavLink>
                                <NavLink
                                    v-show="$page.props.userData.canReadMessages"
                                    v-tippy="'Messages.'"
                                    :href="route('messages.index')"
                                    :active="route().current('messages.index')"
                                >
                                    Msg
                                </NavLink>
                                <NavLink
                                    v-show="$page.props.userData.canReadTemplates"
                                    v-tippy="'Templates.'"
                                    :href="route('templates.index')"
                                    :active="route().current('templates.index')"
                                >
                                    Temp
                                </NavLink>
                                <NavLink
                                    v-show="$page.props.userData.canReadOverrides"
                                    v-tippy="'Restore user overridden and deleted planners.'"
                                    :href="route('overrides.index')"
                                    :active="route().current('overrides.index')"
                                >
                                    Over
                                </NavLink>
                                <NavLink
                                    v-show="$page.props.userData.canReadAudits"
                                    v-tippy="'Track changes that have been made by users.'"
                                    :href="route('audits.index')"
                                    :active="route().current('audits.index')"
                                >
                                    Audit
                                </NavLink>
                            </div>
                        </div>

                        <div class="hidden sm:flex sm:items-center sm:ml-6">
                            <div class="ml-3 relative">
                                <!-- Teams Dropdown -->
                                <Dropdown
                                    v-if="$page.props.jetstream.hasTeamFeatures && $page.props.userData.canReadTeams"
                                    align="right"
                                    width="60"
                                >
                                    <template #trigger>
                                        <span class="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition capitalize ease-in-out duration-150"
                                            >
                                                {{ $page.props.auth.user.current_team.name }}

                                                <svg
                                                    class="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </template>

                                    <template #content>
                                        <div class="w-60">
                                            <!-- Team Management -->
                                            <template v-if="$page.props.jetstream.hasTeamFeatures">
                                                <div class="block px-4 py-2 text-xs text-gray-400">
                                                    Manage Team
                                                </div>

                                                <!-- Team Settings -->
                                                <DropdownLink
                                                    v-show="$page.props.auth.user.current_team"
                                                    :href="route('teams.show', $page.props.auth.user.current_team)"
                                                >
                                                    Team Settings
                                                </DropdownLink>

                                                <DropdownLink
                                                    v-if="$page.props.userData.canEditTeams"
                                                    :href="route('teams.create')"
                                                >
                                                    Create Team
                                                </DropdownLink>

                                                <div class="border-t border-gray-200" />

                                                <!-- Team Switcher -->
                                                <div class="block px-4 py-2 text-xs text-gray-400">
                                                    Switch Teams
                                                </div>

                                                <template
                                                    v-for="team in $page.props.auth.user.all_teams"
                                                    :key="team.id"
                                                >
                                                    <form @submit.prevent="switchToTeam(team)">
                                                        <DropdownLink as="button">
                                                            <div class="flex items-center">
                                                                <svg
                                                                    v-if="team.id == $page.props.auth.user.current_team_id"
                                                                    class="mr-2 h-5 w-5 text-green-400"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                    fill="none"
                                                                    viewBox="0 0 24 24"
                                                                    stroke-width="1.5"
                                                                    stroke="currentColor"
                                                                >
                                                                    <path
                                                                        stroke-linecap="round"
                                                                        stroke-linejoin="round"
                                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                    />
                                                                </svg>

                                                                <div class="capitalize">
                                                                    {{ team.name }}
                                                                </div>
                                                            </div>
                                                        </DropdownLink>
                                                    </form>
                                                </template>
                                            </template>
                                        </div>
                                    </template>
                                </Dropdown>
                            </div>

                            <!-- Settings Dropdown -->
                            <div class="ml-3 relative">
                                <Dropdown
                                    align="right"
                                    width="48"
                                >
                                    <template #trigger>
                                        <button
                                            v-if="$page.props.jetstream.managesProfilePhotos"
                                            class="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition"
                                        >
                                            <img
                                                class="h-8 w-8 rounded-full object-cover"
                                                :src="$page.props.auth.user.profile_photo_url"
                                                :alt="$page.props.auth.user.name"
                                            >
                                        </button>

                                        <span
                                            v-else
                                            class="inline-flex rounded-md"
                                        >
                                            <button
                                                type="button"
                                                style="min-width: 200px;"
                                                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none focus:bg-gray-50 active:bg-gray-50 transition ease-in-out duration-150"
                                            >
                                                {{ $page.props.auth.user.first_name }}
                                                {{ $page.props.auth.user.last_name }}
                                                <!-- (Role: {{ $page.props.currentUserRole.name.toUpperCase() }}) -->
                                                <svg
                                                    class="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </template>

                                    <template #content>
                                        <!-- Account Management -->
                                        <div class="block px-4 py-2 text-xs text-gray-400">
                                            Manage Account
                                        </div>

                                        <DropdownLink :href="route('profile.show')">
                                            Profile
                                        </DropdownLink>

                                        <DropdownLink
                                            v-if="$page.props.jetstream.hasApiFeatures && $page.props.userData.isSuperAdmin"
                                            :href="route('tokens.index')"
                                        >
                                            API Manager
                                        </DropdownLink>

                                        <div class="border-t border-gray-200" />

                                        <!-- Authentication -->
                                        <form @submit.prevent="logout">
                                            <DropdownLink as="button">
                                                Log Out
                                            </DropdownLink>
                                        </form>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>

                        <!-- Hamburger -->
                        <div class="-mr-2 flex items-center sm:hidden">
                            <button
                                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                                @click="showingNavigationDropdown = ! showingNavigationDropdown"
                            >
                                <svg
                                    class="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        :class="{'hidden': showingNavigationDropdown, 'inline-flex': ! showingNavigationDropdown }"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        :class="{'hidden': ! showingNavigationDropdown, 'inline-flex': showingNavigationDropdown }"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Responsive Navigation Menu -->
                <div
                    :class="{'block': showingNavigationDropdown, 'hidden': ! showingNavigationDropdown}"
                    class="sm:hidden"
                >
                    <div class="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            v-show="$page.props.userData.canReadPlanners"
                            :href="route('planners.index',{_query:{today_only:0,search_by:'open',active_only:1,sort:'checkindesk'}})"
                            :active="route().current('planners.index')"
                        >
                            Plan
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            v-show="$page.props.userData.canReadCounters"
                            :href="route('counters.index')"
                            :active="route().current('counters.index')"
                        >
                            Count
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            v-show="$page.props.userData.canReadDestinations"
                            :href="route('destinations.index')"
                            :active="route().current('destinations.index')"
                        >
                            Dest
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            v-show="$page.props.userData.canReadAirlines"
                            :href="route('airlines.index')"
                            :active="route().current('airlines.index')"
                        >
                            Air
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            v-show="$page.props.userData.canReadUsers"
                            :href="route('users.index')"
                            :active="route().current('users.index')"
                        >
                            User
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            v-show="$page.props.userData.canReadRoles"
                            :href="route('roles.index')"
                            :active="route().current('roles.index')"
                        >
                            Role
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            v-show="$page.props.userData.canReadSchedules"
                            v-tippy="'Schedules.'"
                            :href="route('schedules.index')"
                            :active="route().current('schedules.index')"
                        >
                            Sched
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            v-show="$page.props.userData.canReadMessages"
                            v-tippy="'Messages.'"
                            :href="route('messages.index')"
                            :active="route().current('messages.index')"
                        >
                            Msg
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            v-show="$page.props.userData.canReadTemplates"
                            v-tippy="'Templates.'"
                            :href="route('templates.index')"
                            :active="route().current('templates.index')"
                        >
                            Temp
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            v-show="$page.props.userData.canReadOverrides"
                            :href="route('overrides.index')"
                            :active="route().current('overrides.index')"
                        >
                            Over
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            v-show="$page.props.userData.canReadAudits"
                            :href="route('audits.index')"
                            :active="route().current('audits.index')"
                        >
                            Audit
                        </ResponsiveNavLink>
                    </div>

                    <!-- Responsive Settings Options -->
                    <div class="pt-4 pb-1 border-t border-gray-200">
                        <div class="flex items-center px-4">
                            <div
                                v-if="$page.props.jetstream.managesProfilePhotos"
                                class="shrink-0 mr-3"
                            >
                                <img
                                    class="h-10 w-10 rounded-full object-cover"
                                    :src="$page.props.auth.user.profile_photo_url"
                                    :alt="$page.props.auth.user.name"
                                >
                            </div>

                            <div>
                                <div class="font-medium text-base text-gray-800">
                                    {{ $page.props.auth.user.name }}
                                </div>
                                <div class="font-medium text-sm text-gray-500">
                                    {{ $page.props.auth.user.email }}
                                </div>
                            </div>
                        </div>

                        <div class="mt-3 space-y-1">
                            <ResponsiveNavLink
                                :href="route('profile.show')"
                                :active="route().current('profile.show')"
                            >
                                Profile
                            </ResponsiveNavLink>

                            <ResponsiveNavLink
                                v-if="$page.props.jetstream.hasApiFeatures && $page.props.userData.isSuperAdmin"
                                :href="route('tokens.index')"
                                :active="route().current('tokens.index')"
                            >
                                API Manager
                            </ResponsiveNavLink>

                            <!-- Authentication -->
                            <form
                                method="POST"
                                @submit.prevent="logout"
                            >
                                <ResponsiveNavLink as="button">
                                    Log Out
                                </ResponsiveNavLink>
                            </form>

                            <!-- Team Management -->
                            <template v-if="$page.props.jetstream.hasTeamFeatures && $page.props.userData.canReadTeams">
                                <div class="border-t border-gray-200" />

                                <div class="block px-4 py-2 text-xs text-gray-400">
                                    Manage Team
                                </div>

                                <!-- Team Settings -->
                                <ResponsiveNavLink
                                    v-show="$page.props.auth.user.current_team"
                                    :href="route('teams.show', $page.props.auth.user.current_team)"
                                    :active="route().current('teams.show')"
                                >
                                    Team Settings
                                </ResponsiveNavLink>

                                <ResponsiveNavLink
                                    v-if="$page.props.jetstream.canAddTeams"
                                    :href="route('teams.create')"
                                    :active="route().current('teams.create')"
                                >
                                    Create Team
                                </ResponsiveNavLink>

                                <div class="border-t border-gray-200" />

                                <!-- Team Switcher -->
                                <div class="block px-4 py-2 text-xs text-gray-400">
                                    Switch Teams
                                </div>

                                <template
                                    v-for="team in $page.props.auth.user.all_teams"
                                    :key="team.id"
                                >
                                    <form @submit.prevent="switchToTeam(team)">
                                        <ResponsiveNavLink as="button">
                                            <div class="flex items-center">
                                                <svg
                                                    v-if="team.id == $page.props.auth.user.current_team_id"
                                                    class="mr-2 h-5 w-5 text-green-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                                <div class="capitalize">
                                                    {{ team.name }}
                                                </div>
                                            </div>
                                        </ResponsiveNavLink>
                                    </form>
                                </template>
                            </template>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Page Heading -->
            <header
                v-if="$slots.header"
                class="bg-white shadow"
            >
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <slot name="header" />
                </div>
            </header>

            <!-- Page Content -->
            <main>
                <slot />
            </main>
        </div>
    </div>
</template>
