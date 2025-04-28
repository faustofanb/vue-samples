<template>
    <div :class="styles.fetchDataRoot">
        <h1 :class="styles.heading">Latest Vue Core Commits</h1>
        <div :class="styles.radioGroup">
            <template v-for="(branch, index) in branches" :key="index">
                <div :class="styles.radioItem">
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
        <p :class="styles.paragraph">vuejs/core@{{ currentBranch }}</p>
        <ul v-if="commits.length > 0" :class="styles.list">
            <li
                v-for="{ html_url, sha, author, commit } in commits"
                :key="sha"
                :class="styles.listItem"
            >
                <a :href="html_url" :class="styles.link">{{ sha.slice(0, 7) }}</a>
                - <span :class="styles.message">{{ truncate(commit.message) }}</span> <br />
                by
                <span :class="styles.author">
                    <a :href="author.htmlurl" target="_blank">{{ commit.author.name }}</a></span
                >
                at <span :class="styles.date">{{ formateDate(commit.author.date) }}</span>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import styles from '@/assets/modules/3. FetchData.module.scss'
interface Commit {
    html_url: string
    sha: string
    author: { htmlurl: string }
    commit: { message: string; author: { name: string; date: string } }
}
const API_URL = `https://api.github.com/repos/vuejs/core/commits?per_page=3&sha=`
const branches = ['main', 'minor']
const currentBranch = ref(branches[0])
const commits = ref<Commit[]>([])

watchEffect(async () => {
    const res = await fetch(`${API_URL}${currentBranch.value}`)
    commits.value = await res.json()
})

function truncate(str: string, n = 100) {
    return str.length > n ? str.slice(0, n - 1) + '...' : str
}

function formateDate(dateString: string) {
    return new Date(dateString).toLocaleDateString()
}
</script>
