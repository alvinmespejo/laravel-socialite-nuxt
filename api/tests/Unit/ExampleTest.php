<?php

namespace Tests\Unit;

use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use Mockery;
use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_that_true_is_true(): void
    {
        $this->assertTrue(true);
    }

    // public function test_socialite_login_callback()
    // {
    //     $abstractUser = Mockery::mock(\Laravel\Socialite\Two\User::class);
    //     $abstractUser->shouldReceive('getId')->andReturn('123456');
    //     $abstractUser->shouldReceive('getEmail')->andReturn('test@test.com');
    //     $abstractUser->shouldReceive('getName')->andReturn('John Doe');
    //     $abstractUser->shouldReceive('getAvatar')->andReturn('https://en.gravatar.com/userimage');

    //     $provider = Mockery::mock(\Laravel\Socialite\Contracts\Provider::class);
    //     $provider->shouldReceive('user')->andReturn($abstractUser);

    //     Socialite::shouldReceive('driver')->with('facebook')->andReturn($provider);

    //     // $this->visit(route("authFacebookCallback"))
    //     //  ->seePageIs(route("home"));

    // }
}
