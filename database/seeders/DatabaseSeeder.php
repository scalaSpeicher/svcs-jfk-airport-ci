<?php

namespace Database\Seeders;

use App\Models\User;
use Artisan;
use Closure;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;
use Spatie\Permission\Models\Permission;
use Symfony\Component\Console\Helper\ProgressBar;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (App::environment('local')) {
            $this->command->warn(PHP_EOL . 'Creating roles and permissions...');
            $permissions = $this->withProgressBar(1, fn () => $this->call(RolesAndPermissionsSeeder::class));
            $this->command->info('Roles and permissions created.');

            $this->command->warn(PHP_EOL . 'Creating airlines, labels, and branding...');
            $airlines = $this->withProgressBar(1, fn () => $this->call([
                AirlinesTablesSeeder::class,
                AirlinesLabelsLidTablesSeeder::class,
                AirlinesBrandingTableSeeder::class,
            ]));
            $this->command->info('Airlines, labels, and branding created.');

            $this->command->warn(PHP_EOL . 'Creating destinations...');
            $destinations = $this->withProgressBar(1, fn () => $this->call(DestinationsTableSeeder::class));
            $this->command->info('Destinations created.');

            $this->command->warn(PHP_EOL . 'Creating counters...');
            $counters = $this->withProgressBar(1, fn () => $this->call(CountersTableSeeder::class));
            $this->command->info('Counters created.');

            $this->command->warn(PHP_EOL . 'Creating users...');
            $user = $this->withProgressBar(20, fn () => User::factory(1)->create());
            $this->command->info('Users created.');

            $this->command->warn(PHP_EOL . 'Creating planners...');
            $planners = $this->withProgressBar(1, fn () => $this->call(PlannersTableSeeder::class));
            $this->command->info('Planners created.');

            $this->command->warn(PHP_EOL . 'Updating roles and permissions...');
            Artisan::call('permission:create-permission-routes');
            $this->command->info('Roles and permissions updated.');

            $this->command->warn(PHP_EOL . 'Creating admin user...');
            $user = $this->withProgressBar(1, fn () => User::factory(1)->create([
                'first_name' => 'Demo',
                'last_name' => 'Admin',
                'email' => 'demo.admin@scala.com',
                'email_verified_at' => now(),
                'password' => '$2y$10$dOCF7vC6NxkBNE1yzl4tzuZfPTx8kfyxdx6YjoRozZ939wZJ88toW', // DevPass!
                'two_factor_secret' => null,
                'two_factor_recovery_codes' => null,
                'remember_token' => '3tU4tluPzmQ6dou8PFV7EafvfsIrAsmwCh0XpCuuYgWH0D4TYJvlgHJuWo7c',
                'profile_photo_path' => null,
                'current_team_id' => null,
                'status' => 'Active',
            ]));
            $user[0]->givePermissionTo(Permission::all());
            $this->command->info('Admin user created.');

            $this->command->warn(PHP_EOL . 'Creating dev user...');
            $user = $this->withProgressBar(1, fn () => User::factory(1)->create([
                'first_name' => 'Dev',
                'last_name' => 'User',
                'email' => 'matthew.speicher@scala.com',
                'email_verified_at' => now(),
                'password' => '$2y$10$dOCF7vC6NxkBNE1yzl4tzuZfPTx8kfyxdx6YjoRozZ939wZJ88toW', // DevPass!
                'two_factor_secret' => null,
                'two_factor_recovery_codes' => null,
                'remember_token' => '3tU4tluPzmQ6dou8PFV7EafvfsIrAsmwCh0XpCuuYgWH0D4TYJvlgHJuWo7c',
                'profile_photo_path' => null,
                'current_team_id' => null,
                'status' => 'Active',
            ]));
            $user[0]->givePermissionTo(Permission::all());
            $this->command->info('Dev user created.');
        }
    }

    protected function withProgressBar(int $amount, Closure $createCollectionOfOne): Collection
    {
        $progressBar = new ProgressBar($this->command->getOutput(), $amount);

        $progressBar->start();

        $items = new Collection();

        foreach (range(1, $amount) as $i) {
            $items = $items->merge(
                $createCollectionOfOne()
            );
            $progressBar->advance();
        }

        $progressBar->finish();

        $this->command->getOutput()->writeln('');

        return $items;
    }
}
