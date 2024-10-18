<?php

namespace CodeWithDennis\FilamentThemeInspector;

use Closure;
use Filament\Contracts\Plugin;
use Filament\Panel;
use Filament\Support\Assets\Js;
use Filament\Support\Concerns\EvaluatesClosures;
use Filament\Support\Facades\FilamentAsset;
use Filament\Support\Facades\FilamentView;
use Filament\View\PanelsRenderHook;
use Illuminate\Contracts\View\View;

class FilamentThemeInspectorPlugin implements Plugin
{
    use EvaluatesClosures;

    protected Closure | bool $disabled = false;

    public function getId(): string
    {
        return 'filament-theme-inspector';
    }

    public function disabled(Closure | bool $disabled = true): self
    {
        $this->disabled = $disabled;

        return $this;
    }

    public function isDisabled(): bool
    {
        return $this->evaluate($this->disabled);
    }

    public function register(Panel $panel): void
    {
        FilamentView::registerRenderHook(
            PanelsRenderHook::BODY_END,
            fn (): View => view('filament-theme-inspector::inspector', [
                'disabled' => $this->isDisabled(),
            ]),
        );

        //        FilamentAsset::register([
        //            Js::make('filament-theme-inspector-scripts', __DIR__ . '/../resources/dist/filament-theme-inspector.js'),
        //        ]);
    }

    public function boot(Panel $panel): void
    {
        //
    }

    public static function make(): static
    {
        return app(static::class);
    }

    public static function get(): static
    {
        /** @var static $plugin */
        $plugin = filament(app(static::class)->getId());

        return $plugin;
    }
}
