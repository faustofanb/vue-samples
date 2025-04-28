<template>
    <div :class="styles.container">
        <!-- 标题与段落 -->
        <h1 :class="[styles.heading, styles.h1]" id="main-title" tabindex="0">HTML5 标题示例</h1>
        <h2 :class="[styles.heading, styles.h2]" id="subtitle" tabindex="0">副标题</h2>
        <h3 :class="[styles.heading, styles.h3]" id="third-title" tabindex="0">三级标题</h3>
        <p :class="styles.paragraph" id="main-paragraph" lang="zh-cn" dir="ltr" title="普通段落">
            这是一个普通段落，支持
            <strong :class="styles.strong" title="加粗">加粗</strong>、
            <em :class="styles.em" title="斜体">斜体</em>、
            <u :class="styles.underline" title="下划线">下划线</u>、
            <a
                href="https://www.example.com"
                target="_blank"
                rel="noopener noreferrer"
                :class="styles.link"
                title="超链接"
                >超链接</a
            >。
        </p>

        <!-- 无序列表 -->
        <h2 :class="[styles.heading, styles.h2]" id="ul-title">无序列表</h2>
        <ul :class="styles.list" id="ul-list" type="disc" aria-label="水果列表">
            <li>苹果</li>
            <li>香蕉</li>
            <li>橙子</li>
        </ul>
        <!-- 有序列表 -->
        <h2 :class="[styles.heading, styles.h2]" id="ol-title">有序列表</h2>
        <ol
            :class="styles.list"
            id="ol-list"
            type="1"
            start="1"
            reversed="false"
            aria-label="步骤列表"
        >
            <li>第一步</li>
            <li>第二步</li>
            <li>第三步</li>
        </ol>

        <!-- 图片 -->
        <h2 :class="[styles.heading, styles.h2]" id="img-title">图片</h2>
        <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
            alt="示例图片"
            :class="styles.demoImg"
            width="400"
            height="225"
            loading="lazy"
            decoding="async"
            referrerpolicy="no-referrer"
            draggable="false"
            title="示例图片"
            aria-label="示例图片"
        />

        <!-- 视频 -->
        <h2 :class="[styles.heading, styles.h2]" id="video-title">视频</h2>
        <video
            controls
            autoplay="false"
            loop="false"
            muted="false"
            poster="https://placekitten.com/320/180"
            width="320"
            height="180"
            preload="metadata"
            playsinline
            tabindex="0"
            aria-label="示例视频"
            title="示例视频"
            :class="styles.demoImg"
        >
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            您的浏览器不支持 video 标签。
        </video>

        <!-- 音频 -->
        <h2 :class="[styles.heading, styles.h2]" id="audio-title">音频</h2>
        <audio
            controls
            autoplay="false"
            loop="false"
            muted="false"
            preload="none"
            tabindex="0"
            aria-label="示例音频"
            title="示例音频"
            style="margin-bottom: 1rem"
        >
            <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
            您的浏览器不支持 audio 标签。
        </audio>

        <!-- 表格 -->
        <h2 :class="[styles.heading, styles.h2]" id="table-title">表格</h2>
        <table :class="styles.table" summary="人员信息表" aria-label="人员信息表">
            <caption :class="styles.caption">
                人员信息表
            </caption>
            <thead>
                <tr>
                    <th scope="col" abbr="姓名">姓名</th>
                    <th scope="col" abbr="年龄">年龄</th>
                    <th scope="col" abbr="城市">城市</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td headers="姓名">张三</td>
                    <td headers="年龄">25</td>
                    <td headers="城市">北京</td>
                </tr>
                <tr>
                    <td headers="姓名">李四</td>
                    <td headers="年龄">30</td>
                    <td headers="城市">上海</td>
                </tr>
            </tbody>
        </table>

        <!-- 进度条与meter -->
        <h2 :class="[styles.heading, styles.h2]" id="progress-title">进度条</h2>
        <progress
            id="progress-bar"
            :class="styles.progress"
            value="70"
            max="100"
            aria-valuenow="70"
            aria-valuemax="100"
            aria-label="进度条"
        >
            70%
        </progress>
        <h2 :class="[styles.heading, styles.h2]" id="meter-title">Meter 计量</h2>
        <meter
            id="meter-bar"
            :class="styles.meter"
            min="0"
            max="100"
            value="60"
            low="30"
            high="80"
            optimum="70"
            aria-valuenow="60"
            aria-valuemax="100"
            aria-label="计量"
        >
            60/100
        </meter>

        <!-- 代码块与引用 -->
        <h2 :class="[styles.heading, styles.h2]" id="code-title">代码块</h2>
        <pre
            :class="styles.codeBlock"
            tabindex="0"
            aria-label="代码块"
        ><code class="language-js" spellcheck="false">console.log('Hello, HTML5!')</code></pre>
        <h2 :class="[styles.heading, styles.h2]" id="blockquote-title">引用</h2>
        <blockquote
            cite="https://www.example.com/quote"
            lang="zh-cn"
            :class="styles.blockquote"
            title="名言引用"
        >
            “学如逆水行舟，不进则退。”
        </blockquote>

        <!-- iframe 示例 -->
        <h2 :class="[styles.heading, styles.h2]" id="iframe-title">内嵌网页（iframe）</h2>
        <iframe
            src="https://www.example.com"
            title="示例网页"
            width="100%"
            height="220"
            :class="styles.iframe"
            loading="lazy"
            referrerpolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin allow-popups"
            tabindex="0"
            aria-label="内嵌网页"
            allowfullscreen="false"
            frameborder="0"
            scrolling="auto"
        ></iframe>
    </div>
</template>

<script setup lang="ts">
import styles from '@/assets/modules/1. Html5.module.scss'
</script>
