<script setup>

let itemsPerPage = 10;
let page = document.location.pathname.substring(1);
let selectedItemsOption = new URL(location.href).searchParams.get('itemsPerPage');
if (selectedItemsOption) {
    itemsPerPage = selectedItemsOption;
}

const setCookie = (cookies) => {
    document.cookie = 'scalaCookies=' + JSON.stringify(cookies) + '; path=/; max-age=${60 * 60 * 24 * 14};';
}

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}


let scalaCookies = getCookie('scalaCookies');
if (scalaCookies != null) {
    scalaCookies = JSON.parse(getCookie('scalaCookies'));
}
if (scalaCookies != null && scalaCookies.itemsPerPage != null) {
    let pageItems = scalaCookies.itemsPerPage;
    for (const [key, value] of Object.entries(pageItems)) {
        if (key == page) {
            itemsPerPage = value;
            break;
        }
    };
}

if (selectedItemsOption) {
    itemsPerPage = selectedItemsOption;
}

const onItemsPerPageChange = (event) => {
    let url = new URL(document.location);
    let pageItems;
    if (scalaCookies != null && scalaCookies.itemsPerPage != null) {
        pageItems = scalaCookies.itemsPerPage;
        let entryFound = false;
        for (const [key, value] of Object.entries(pageItems)) {
            if (key == page) {
                pageItems[key] = event.target.value;
                entryFound = true;
            }
        };
        if (!entryFound) {
            pageItems[page] = event.target.value;
        }
    } else {
        let key = url.pathname.substring(1);
        let value = event.target.value;
        pageItems = {
            [key]: value,
        }
    }
    setCookie({
        itemsPerPage: pageItems
    });
    url.searchParams.set("itemsPerPage", event.target.value);
    window.location.assign(url.href);
}
</script>
<template>
    <div>
        <select
            v-model="itemsPerPage"
            class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
            @change="onItemsPerPageChange($event)"
        >
            <option value="10">
                10
            </option>
            <option value="20">
                20
            </option>
            <option value="50">
                50
            </option>
            <option value="100">
                100
            </option>
            <option value="All">
                All
            </option>
        </select>
        <p><small>Items per page</small></p>
    </div>
</template>
