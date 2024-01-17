<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Log;

class TestLoggingCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:test-logging';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test fires all log events.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        Log::info('Test info log event fired.');
        Log::error('Test error log event fired.');
        Log::warning('Test warning log event fired.');
        Log::debug('Test debug log event fired.');
        Log::emergency('Test emergency log event fired.');
        Log::alert('Test alert log event fired.');
        Log::critical('Test critical log event fired.');
        Log::notice('Test notice log event fired.');

        $this->info('Test logging complete.');
    }
}
