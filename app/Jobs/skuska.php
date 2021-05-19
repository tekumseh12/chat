<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use App\Models\Message;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class skuska implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
  
    public $tries = 3;
    public $maxExceptions = 2;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Message $message)
    {
      $this->message = $message;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $a = "";
        for ($i=0; $i<10000000;$i++){
          $a=$a." ".$i;
        }
        $file = fopen("la.txt", "w");
        fwrite($file, $a);
    }

}
