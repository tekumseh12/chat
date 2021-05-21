<?php

namespace Database\Factories;

use App\Models\Message;
use Illuminate\Database\Eloquent\Factories\Factory;

class MessageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Message::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function __contructor(){

    }
    public function definition()
    {
        return [
            "from_user"=>$this->faker->name,
            "to_user"=>$this->faker->name,
            "message"=>"I was here",
        ];
    }
    public function from_user()
    {

      return $this->state(function (array $attributes) {

          $array = array("a","b","c");
          return [
            "from_user"=> $array[1] ,

            ];
        });
    }
    public function to_user()
    {
      return $this->state(function () {

          return [
            "to_user"=> $array[1],

            ];
      });

    }
}
