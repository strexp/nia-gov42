<template>
  <div class="nia-shell">
    <a class="nia-skip-link" href="#nia-main">{{ $t('common.skipToContent') }}</a>
    <AppHeader />
    <main id="nia-main" class="nia-main" tabindex="-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
