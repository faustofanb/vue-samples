<script setup lang="ts">
import { ref, watchEffect } from 'vue'

interface Commit {
    html_url: string
    sha: string
    author: {
        htmlurl: string
    }
    commit: {
        message: string
        author: {
            name: string
            date: string
        }
    }
}

const API_URL = `https://api.github.com/repos/vuejs/core/commits?per_page=3&sha=`
const branches = ['main', 'minor']
const currentBranch = ref(branches[0])
const commits = ref<Commit[]>([])

watchEffect(async () => {
    const url = `${API_URL}${currentBranch.value}`
    commits.value = await (await fetch(url)).json()
})

function truncate(v: string): string {
    const newLine = v.indexOf('\n')
    return newLine > 0 ? v.slice(0, newLine) : v
}

function formateDate(v: string): string {
    return v.replace(/[TZ]/g, ' ')
}
</script>

<template>
    <h1>Latest Vue Core Commits</h1>
    <div class="radio-group">
        <template v-for="(branch, index) in branches" :key="index">
            <div class="radio-item">
                <input
                    type="radio"
                    :id="branch"
                    :value="branch"
                    name="branch"
                    v-model="currentBranch"
                />
                <label :for="branch" style="margin-left: 10px">{{ branch }}</label>
            </div>
        </template>
    </div>
    <p>vuejs/core@{{ currentBranch }}</p>

    <ul v-if="commits.length > 0">
        <li v-for="{ html_url, sha, author, commit } in commits" :key="sha">
            <a :href="html_url">{{ sha.slice(0, 7) }}</a>
            - <span class="message">{{ truncate(commit.message) }}</span> <br />
            by
            <span class="author">
                <a :href="author.htmlurl" target="_blank">{{ commit.author.name }}</a></span
            >
            at <span class="date">{{ formateDate(commit.author.date) }}</span>
        </li>
    </ul>
</template>
<style>
a {
    text-decoration: none;
    color: #42b883;
}
li {
    line-height: 1.5em;
    margin-bottom: 20px;
}
.author,
.date {
    font-weight: bold;
}
.radio-group {
    display: flex;
    gap: 10px; /* 设置间距 */
}
.radio-item {
    display: flex;
    align-items: center;
}
</style>
