<template>
    <div :class="styles.form">
        <div :class="styles['form-group']">
            <h2>Text Input</h2>
            <input type="text" v-model="text" placeholder="Text" />
            <h2>Number</h2>
            <input type="number" v-model="number" placeholder="Enter a number" />
            <h2>Email</h2>
            <input type="email" v-model="email" placeholder="Enter email" />
            <h2>Password</h2>
            <input type="password" v-model="password" placeholder="Password" />
            <h2>Textarea</h2>
            <textarea v-model="textarea" rows="3" placeholder="Enter multi-line text"></textarea>
            <p>Text: {{ text }}</p>
            <p>Number: {{ number }}</p>
            <p>Email: {{ email }}</p>
            <p>Password: {{ password }}</p>
            <p>Textarea: {{ textarea }}</p>
        </div>
        <div :class="styles['form-group']">
            <h2>Checkbox</h2>
            <div :class="styles['form-row']">
                <input type="checkbox" id="checkbox" v-model="checked" />
                <label for="checkbox">Checked: {{ checked }}</label>
            </div>
        </div>
        <div :class="styles['form-group']">
            <h2>Multi Checkbox</h2>
            <div :class="styles['form-row']">
                <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
                <label for="jack">Jack</label>
                <input type="checkbox" id="john" value="John" v-model="checkedNames" />
                <label for="john">John</label>
                <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
                <label for="mike">Mike</label>
            </div>
            <p>Checked names: {{ checkedNames }}</p>
        </div>
        <div :class="styles['form-group']">
            <h2>Radio</h2>
            <div :class="styles['form-row']">
                <input type="radio" id="one" value="One" v-model="picked" />
                <label for="one">One</label>
                <input type="radio" id="two" value="Two" v-model="picked" />
                <label for="two">Two</label>
            </div>
            <p>Picked: {{ picked }}</p>
        </div>
        <div :class="styles['form-group']">
            <h2>Select</h2>
            <select v-model="selected">
                <option disabled value="">Please select one</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
            </select>
            <p>Selected: {{ selected }}</p>
        </div>
        <div :class="styles['form-group']">
            <h2>Multi Select</h2>
            <select v-model="multiSelected" multiple>
                <option>A</option>
                <option>B</option>
                <option>C</option>
            </select>
            <p>Selected: {{ multiSelected }}</p>
        </div>
        <div :class="styles['form-group']">
            <h2>Range Slider</h2>
            <div :class="styles['form-row']">
                <input type="range" min="0" max="100" v-model="rangeValue" />
                <span>{{ rangeValue }}</span>
            </div>
        </div>
        <div :class="styles['form-group']">
            <h2>Date Picker</h2>
            <input type="date" v-model="dateValue" />
            <p>Date: {{ dateValue }}</p>
        </div>
        <div :class="styles['form-group']">
            <h2>File Upload</h2>
            <input type="file" @change="onFileChange" />
            <p v-if="fileName">File: {{ fileName }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import styles from '@/assets/modules/2. Form.module.scss'

const text = ref('Edit me')
const checked = ref(true)
const checkedNames = ref(['Jack'])
const picked = ref('One')
const selected = ref('A')
const multiSelected = ref(['A'])
const password = ref('')
const email = ref('')
const number = ref(0)
const textarea = ref('')
const switchOn = ref(false)
const rangeValue = ref(50)
const dateValue = ref('')
const fileName = ref('')

function onFileChange(event: Event) {
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
        fileName.value = input.files[0].name
    }
}
</script>
