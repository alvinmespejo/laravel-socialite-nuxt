<?php

namespace Tests;

use Illuminate\Foundation\Testing\LazilyRefreshDatabase;
use Illuminate\Foundation\Testing\TestCase;

abstract class FeatureTestCase extends TestCase
{
    use LazilyRefreshDatabase
}
