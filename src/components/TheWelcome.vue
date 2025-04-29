<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
</script>

<template>
    <div class="welcome-list">
        <WelcomeItem>
            <template #icon>
                <DocumentationIcon />
            </template>
            <template #heading>Documentation</template>

            Vue’s
            <a href="https://vuejs.org/" target="_blank" rel="noopener">official documentation</a>
            provides you with all information you need to get started.
        </WelcomeItem>

        <WelcomeItem>
            <template #icon>
                <ToolingIcon />
            </template>
            <template #heading>Tooling</template>

            This project is served and bundled with
            <a href="https://vite.dev/guide/features.html" target="_blank" rel="noopener">Vite</a>.
            The recommended IDE setup is
            <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VSCode</a>
            +
            <a href="https://github.com/vuejs/language-tools" target="_blank" rel="noopener"
                >Vue - Official</a
            >. If you need to test your components and web pages, check out
            <a href="https://vitest.dev/" target="_blank" rel="noopener">Vitest</a>
            and
            <a href="https://www.cypress.io/" target="_blank" rel="noopener">Cypress</a>
            /
            <a href="https://playwright.dev/" target="_blank" rel="noopener">Playwright</a>.

            <br />

            More instructions are available in
            <a href="javascript:void(0)" @click="openReadmeInEditor"><code>README.md</code></a
            >.
        </WelcomeItem>

        <WelcomeItem>
            <template #icon>
                <EcosystemIcon />
            </template>
            <template #heading>Ecosystem</template>

            Get official tools and libraries for your project:
            <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
            <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
            <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a
            >, and
            <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener"
                >Vue Dev Tools</a
            >. If you need more resources, we suggest paying
            <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener"
                >Awesome Vue</a
            >
            a visit.
        </WelcomeItem>

        <WelcomeItem>
            <template #icon>
                <CommunityIcon />
            </template>
            <template #heading>Community</template>

            Got stuck? Ask your question on
            <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a>
            (our official Discord server), or
            <a
                href="https://stackoverflow.com/questions/tagged/vue.js"
                target="_blank"
                rel="noopener"
                >StackOverflow</a
            >. You should also follow the official
            <a href="https://bsky.app/profile/vuejs.org" target="_blank" rel="noopener"
                >@vuejs.org</a
            >
            Bluesky account or the
            <a href="https://x.com/vuejs" target="_blank" rel="noopener">@vuejs</a>
            X account for latest news in the Vue world.
        </WelcomeItem>

        <WelcomeItem>
            <template #icon>
                <SupportIcon />
            </template>
            <template #heading>Support Vue</template>

            As an independent project, Vue relies on community backing for its sustainability. You
            can help us by
            <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener"
                >becoming a sponsor</a
            >.
        </WelcomeItem>
    </div>
</template>

<style scoped lang="scss">
.welcome-list {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin: 32px 0;
}

:deep(.item) {
    position: relative;
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 2px 16px 0 rgba(60, 60, 60, 0.08);
    padding: 28px 32px 28px 48px;
    transition:
        box-shadow 0.2s,
        transform 0.2s;
    display: flex;
    align-items: center;
    gap: 20px;
    border-left: 8px solid var(--item-color, #42b983);
}
:deep(.item):nth-child(1) {
    --item-color: #42b983;
    background: linear-gradient(90deg, #e8f8f2 0%, #fff 80%);
}
:deep(.item):nth-child(2) {
    --item-color: #3477f5;
    background: linear-gradient(90deg, #eaf1fb 0%, #fff 80%);
}
:deep(.item):nth-child(3) {
    --item-color: #f5a623;
    background: linear-gradient(90deg, #fff7e6 0%, #fff 80%);
}
:deep(.item):nth-child(4) {
    --item-color: #e34c8f;
    background: linear-gradient(90deg, #fbeaf2 0%, #fff 80%);
}
:deep(.item):nth-child(5) {
    --item-color: #7d5fff;
    background: linear-gradient(90deg, #edeafd 0%, #fff 80%);
}

:deep(.item):hover {
    box-shadow: 0 6px 32px 0 rgba(60, 60, 60, 0.16);
    transform: translateY(-2px) scale(1.01);
}
:deep(.item) a {
    color: var(--item-color, #42b983);
    text-decoration: underline;
    transition: color 0.2s;
}
:deep(.item) a:hover {
    color: #2c8f6b;
}
:deep(.item) code {
    background: #f6f8fa;
    border-radius: 4px;
    padding: 2px 6px;
    font-size: 0.95em;
}
:deep(.item) h3,
:deep(.item) [slot='heading'] {
    font-size: 1.2em;
    font-weight: 600;
    margin-bottom: 0;
    color: #222;
    display: inline-block;
    vertical-align: middle;
}
:deep(.item) svg {
    width: 32px;
    height: 32px;
    margin-right: 8px;
    flex-shrink: 0;
}
@media (max-width: 600px) {
    :deep(.item) {
        padding: 18px 10px 18px 20px;
        flex-direction: column;
        gap: 10px;
        border-left-width: 4px;
    }
}
</style>
