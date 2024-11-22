<!--
SPDX-FileCopyrightText: syuilo and misskey-project & noridev and acuaskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<MkStickyContainer>
	<template #header><XHeader :actions="headerActions" :tabs="headerTabs"/></template>
	<MkSpacer :contentMax="700" :marginMin="16" :marginMax="32">
		<FormSuspense :p="init">
			<div class="_gaps_m">
				<div class="_panel" style="padding: 16px;">
					<MkSwitch v-model="enableReceivePrerelease">
						<template #label>{{ i18n.ts.enableReceivePrerelease }}</template>
					</MkSwitch>
				</div>

				<template v-if="(version && version.length > 0) && (releasesacuaskey && releasesacuaskey.length > 0)">
					<FormInfo v-if="compareVersions(version, releasesacuaskey[0].tag_name) > 0">{{ i18n.ts.youAreRunningBetaClient }}</FormInfo>
					<FormInfo v-else-if="compareVersions(version, releasesacuaskey[0].tag_name) === 0">{{ i18n.ts.youAreRunningUpToDateClient }}</FormInfo>
					<FormInfo v-else warn>{{ i18n.ts.newVersionOfClientAvailable }}</FormInfo>
				</template>
				<FormInfo v-else>{{ i18n.ts.loading }}</FormInfo>

				<FormSection first>
					<template #label>{{ instanceName }}</template>
					<MkKeyValue @click="whatIsNewacuaskey">
						<template #key>{{ i18n.ts.currentVersion }} <i class="ti ti-external-link"></i></template>
						<template #value>{{ version }}</template>
					</MkKeyValue>
					<MkKeyValue v-if="version < releasesacuaskey[0].tag_name && !skipVersion" style="margin-top: 10px;" @click="whatIsNewLatestacuaskey">
						<template #key>{{ i18n.ts.latestVersion }} <i class="ti ti-external-link"></i></template>
						<template v-if="releasesacuaskey" #value>{{ releasesacuaskey[0].tag_name }}</template>
						<template v-else #value><MkEllipsis/></template>
					</MkKeyValue>
					<MkButton v-if="!skipVersion && (compareVersions(version, releasesacuaskey[0].tag_name) < 0)" style="margin-top: 10px;" @click="skipThisVersion">{{ i18n.ts.skipThisVersion }}</MkButton>
				</FormSection>

				<FormSection @click="whatIsNewLatestacuaskey">
					<template #label>acuaskey <i class="ti ti-external-link"></i></template>
					<MkKeyValue>
						<template #key>{{ i18n.ts.latestVersion }}</template>
						<template v-if="releasesacuaskey" #value>{{ releasesacuaskey[0].tag_name }}</template>
						<template v-else #value><MkEllipsis/></template>
					</MkKeyValue>
					<MkKeyValue style="margin: 8px 0 0; color: var(--MI_THEME-fgTransparentWeak); font-size: 0.85em;">
						<template v-if="releasesacuaskey" #value><MkTime :time="releasesacuaskey[0].published_at" mode="detail"/></template>
						<template v-else #value><MkEllipsis/></template>
					</MkKeyValue>
				</FormSection>

				<FormSection @click="whatIsNewLatestMisskey">
					<template #label>Misskey <i class="ti ti-external-link"></i></template>
					<MkKeyValue>
						<template #key>{{ i18n.ts.latestVersion }}</template>
						<template v-if="releasesMisskey" #value>{{ releasesMisskey[0].tag_name }}</template>
						<template v-else #value><MkEllipsis/></template>
					</MkKeyValue>
					<MkKeyValue style="margin: 8px 0 0; color: var(--MI_THEME-fgTransparentWeak); font-size: 0.85em;">
						<template v-if="releasesMisskey" #value><MkTime :time="releasesMisskey[0].published_at" mode="detail"/></template>
						<template v-else #value><MkEllipsis/></template>
					</MkKeyValue>
				</FormSection>
			</div>
		</FormSuspense>
	</MkSpacer>
</MkStickyContainer>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { version, instanceName, basedMisskeyVersion } from '@@/js/config.js';
import * as os from '@/os.js';
import { misskeyApi } from '@/scripts/misskey-api.js';
import FormInfo from '@/components/MkInfo.vue';
import FormSection from '@/components/form/section.vue';
import MkKeyValue from '@/components/MkKeyValue.vue';
import { definePageMetadata } from '@/scripts/page-metadata.js';
import { i18n } from '@/i18n.js';
import XHeader from '@/pages/admin/_header_.vue';
import MkSwitch from '@/components/MkSwitch.vue';
import { fetchInstance } from '@/instance.js';
import FormSuspense from '@/components/form/suspense.vue';
import MkButton from '@/components/MkButton.vue';

const enableReceivePrerelease = ref<boolean>(false);
const skipVersion = ref<boolean>(false);
const skipacuaskeyVersion = ref<string | null>(null);

const releasesacuaskey = ref(null);
const releasesMisskey = ref(null);

const meta = await misskeyApi('admin/meta');

async function init() {
	enableReceivePrerelease.value = meta.enableReceivePrerelease;
	skipVersion.value = meta.skipVersion;
	skipacuaskeyVersion.value = meta.skipacuaskeyVersion;

	try {
		// acuaskey Releases Fetch
		const acuaskeyResponse = await fetch('https://api.github.com/repos/kokonect-link/acuaskey/releases');
		const acuaskeyData = await acuaskeyResponse.json();
		releasesacuaskey.value = meta.enableReceivePrerelease ? acuaskeyData : acuaskeyData.filter(x => !x.prerelease);

		if (compareVersions(skipacuaskeyVersion.value, releasesacuaskey.value[0].tag_name) < 0) {
			skipVersion.value = false;
			await misskeyApi('admin/update-meta', { skipVersion: skipVersion.value });
		}
	} catch (error) {
		console.error('Failed to fetch acuaskey releases:', error);
	}

	try {
		// Misskey Releases Fetch
		const misskeyResponse = await fetch('https://api.github.com/repos/misskey-dev/misskey/releases');
		const misskeyData = await misskeyResponse.json();
		releasesMisskey.value = meta.enableReceivePrerelease ? misskeyData : misskeyData.filter(x => !x.prerelease);
	} catch (error) {
		console.error('Failed to fetch Misskey releases:', error);
	}
}

function compareVersions(v1: string, v2: string): number {
	const v1Parts = v1.split('.').map(Number);
	const v2Parts = v2.split('.').map(Number);

	for (let i = 0; i < Math.max(v1Parts.length, v2Parts.length); i++) {
		const part1 = v1Parts[i] || 0;
		const part2 = v2Parts[i] || 0;

		if (part1 < part2) return -1;
		if (part1 > part2) return 1;
	}
	return 0;
}

function save() {
	os.apiWithDialog('admin/update-meta', {
		enableReceivePrerelease: enableReceivePrerelease.value,
	}).then(() => {
		fetchInstance(true);
	});
}

function skipThisVersion() {
	skipacuaskeyVersion.value = releasesacuaskey.value[0].tag_name;
	skipVersion.value = true;

	os.apiWithDialog('admin/update-meta', {
		skipVersion: skipVersion.value,
		skipacuaskeyVersion: skipacuaskeyVersion.value,
	}).then(() => {
		fetchInstance(true);
	});
}

const whatIsNewacuaskey = () => {
	window.open(`https://github.com/kokonect-link/acuaskey/blob/develop/CHANGELOG_acuaskey.md#${version.replace(/\./g, '')}`, '_blank');
};

const whatIsNewLatestacuaskey = () => {
	window.open(`https://github.com/kokonect-link/acuaskey/blob/develop/CHANGELOG_acuaskey.md#${releasesacuaskey.value[0].tag_name.replace(/\./g, '')}`, '_blank');
};

const whatIsNewMisskey = () => {
	window.open(`https://misskey-hub.net/docs/releases.html#_${basedMisskeyVersion.replace(/\./g, '-')}`, '_blank');
};

const whatIsNewLatestMisskey = () => {
	window.open(`https://github.com/misskey-dev/misskey/blob/develop/CHANGELOG.md#${releasesMisskey.value[0].tag_name.replace(/\./g, '')}`, '_blank');
};

const headerActions = computed(() => [{
	asFullButton: true,
	icon: 'ti ti-check',
	text: i18n.ts.save,
	handler: save,
}]);

const headerTabs = computed(() => []);

definePageMetadata(() => ({
	title: i18n.ts.acuaskeyUpdate,
	icon: 'ti ti-refresh',
}));
</script>
