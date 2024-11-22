<!--
SPDX-FileCopyrightText: syuilo and misskey-project & noridev and acuaskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<div class="_gaps_m">
	<FormSection first>
		<template #label>{{ i18n.ts._acuaskey.function }}</template>
		<template #description>{{ i18n.ts._acuaskey.functionDescription }}</template>
		<div class="_gaps_m">
			<MkSwitch v-model="nicknameEnabled">
				{{ i18n.ts._acuaskey.nickname }}
				<template #caption>{{ i18n.ts._acuaskey.nicknameDescription }}</template>
			</MkSwitch>

			<div class="_gaps_s">
				<MkSwitch v-model="useEnterToSend">
					<template #label>{{ i18n.ts._acuaskey.useEnterToSend }}</template>
					<template #caption>{{ i18n.ts._acuaskey.useEnterToSendDescription }}</template>
				</MkSwitch>
				<MkSwitch v-model="postFormVisibilityHotkey">
					<template #label>{{ i18n.ts._acuaskey.postFormVisibilityHotkey }}</template>
					<template #caption>{{ i18n.ts._acuaskey.postFormVisibilityHotkeyDescription }}</template>
				</MkSwitch>
				<MkSwitch v-model="showRenoteConfirmPopup">
					<template #label>{{ i18n.ts._acuaskey.showRenoteConfirmPopup }}</template>
					<template #caption>{{ i18n.ts._acuaskey.showRenoteConfirmPopupDescription }}</template>
				</MkSwitch>
				<MkSwitch v-model="expandOnNoteClick">
					<template #label>{{ i18n.ts._acuaskey.expandOnNoteClick }}</template>
					<template #caption>{{ i18n.ts._acuaskey.expandOnNoteClickDescription }}</template>
				</MkSwitch>
				<MkSelect v-if="expandOnNoteClick" v-model="expandOnNoteClickBehavior" style="margin-left: 44px;">
					<template #label>{{ i18n.ts._acuaskey.expandOnNoteClickBehavior }}</template>
					<option value="click">{{ i18n.ts._nsfwOpenBehavior.click }}</option>
					<option value="doubleClick">{{ i18n.ts._nsfwOpenBehavior.doubleClick }}</option>
				</MkSelect>
			</div>

			<div>
				<MkRadios v-model="displayHeaderNavBarWhenScroll">
					<template #label>{{ i18n.ts._acuaskey.displayHeaderNavBarWhenScroll }}</template>
					<option value="all">{{ i18n.ts._acuaskey._displayHeaderNavBarWhenScroll.all }}</option>
					<option value="hideHeaderOnly">{{ i18n.ts._acuaskey._displayHeaderNavBarWhenScroll.hideHeaderOnly }}</option>
					<option value="hideHeaderFloatBtn">{{ i18n.ts._acuaskey._displayHeaderNavBarWhenScroll.hideHeaderFloatBtn }}</option>
					<option value="hideFloatBtnOnly">{{ i18n.ts._acuaskey._displayHeaderNavBarWhenScroll.hideFloatBtnOnly }}</option>
					<option value="hideFloatBtnNavBar">{{ i18n.ts._acuaskey._displayHeaderNavBarWhenScroll.hideFloatBtnNavBar }}</option>
					<option value="hide">{{ i18n.ts._acuaskey._displayHeaderNavBarWhenScroll.hide }}</option>
				</MkRadios>
			</div>
		</div>
	</FormSection>

	<FormSection>
		<template #label>{{ i18n.ts._acuaskey.patch }}</template>
		<template #description>{{ i18n.ts._acuaskey.patchDescription }}</template>
		<div class="_gaps_m">
			<MkSwitch v-model="reactableRemoteReactionEnabled">{{ i18n.ts._acuaskey.reactableRemoteReaction }}</MkSwitch>
			<MkSwitch v-model="showFollowingMessageInsteadOfButtonEnabled">{{ i18n.ts._acuaskey.showFollowingMessageInsteadOfButton }}</MkSwitch>
			<MkSwitch v-model="mobileHeaderChange">{{ i18n.ts._acuaskey.mobileHeaderChange }}</MkSwitch>
			<MkSwitch v-model="renameTheButtonInPostFormToNya">
				{{ i18n.ts._acuaskey.renameTheButtonInPostFormToNya }}
				<template #caption>{{ i18n.ts._acuaskey.renameTheButtonInPostFormToNyaDescription }}</template>
			</MkSwitch>
		</div>
	</FormSection>

	<FormSection>
		<template #label>UI</template>
		<div class="_gaps_m">
			<MkSwitch v-model="enableWidgetsArea">{{ i18n.ts._acuaskey.enableWidgetsArea }}</MkSwitch>

			<div class="_gaps_s" style="margin: 0 10px;">
				<div style="font-weight: bold; padding: 0.5em 0 0 0; margin: 0 0 8px 0;">Friendly UI</div>

				<MkSwitch v-model="friendlyUiEnableNotificationsArea">
					{{ i18n.ts._acuaskey.friendlyUiEnableNotificationsArea }}
				</MkSwitch>
				<MkSwitch v-model="enableLongPressOpenAccountMenu">
					<template #label>{{ i18n.ts._acuaskey.enableLongPressOpenAccountMenu }}</template>
					<template #caption>{{ i18n.ts._acuaskey.enableLongPressOpenAccountMenuDescription }}</template>
				</MkSwitch>
				<MkSwitch v-model="friendlyUiShowAvatarDecorationsInNavBtn">{{ i18n.ts._acuaskey.friendlyUiShowAvatarDecorationsInNavBtn }}</MkSwitch>
			</div>
		</div>
	</FormSection>

	<FormSection>
		<template #label><i class="ti ti-flask"/> {{ i18n.ts.acuaskeyLabs }}</template>
		<template #description>{{ i18n.ts.acuaskeyLabsDescription }}</template>
		<div class="_gaps_m">
		</div>
	</FormSection>
</div>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue';
import MkSwitch from '@/components/MkSwitch.vue';
import MkSelect from '@/components/MkSelect.vue';
import MkRadios from '@/components/MkRadios.vue';
import FormSection from '@/components/form/section.vue';
import { defaultStore } from '@/store.js';
import { i18n } from '@/i18n.js';
import { definePageMetadata } from '@/scripts/page-metadata.js';
import { reloadAsk } from '@/scripts/reload-ask.js';

const nicknameEnabled = computed(defaultStore.makeGetterSetter('nicknameEnabled'));
const useEnterToSend = computed(defaultStore.makeGetterSetter('useEnterToSend'));
const postFormVisibilityHotkey = computed(defaultStore.makeGetterSetter('postFormVisibilityHotkey'));
const showRenoteConfirmPopup = computed(defaultStore.makeGetterSetter('showRenoteConfirmPopup'));
const expandOnNoteClick = computed(defaultStore.makeGetterSetter('expandOnNoteClick'));
const expandOnNoteClickBehavior = computed(defaultStore.makeGetterSetter('expandOnNoteClickBehavior'));
const displayHeaderNavBarWhenScroll = computed(defaultStore.makeGetterSetter('displayHeaderNavBarWhenScroll'));
const reactableRemoteReactionEnabled = computed(defaultStore.makeGetterSetter('reactableRemoteReactionEnabled'));
const showFollowingMessageInsteadOfButtonEnabled = computed(defaultStore.makeGetterSetter('showFollowingMessageInsteadOfButtonEnabled'));
const mobileHeaderChange = computed(defaultStore.makeGetterSetter('mobileHeaderChange'));
const renameTheButtonInPostFormToNya = computed(defaultStore.makeGetterSetter('renameTheButtonInPostFormToNya'));
const enableWidgetsArea = computed(defaultStore.makeGetterSetter('enableWidgetsArea'));
const friendlyUiEnableNotificationsArea = computed(defaultStore.makeGetterSetter('friendlyUiEnableNotificationsArea'));
const enableLongPressOpenAccountMenu = computed(defaultStore.makeGetterSetter('enableLongPressOpenAccountMenu'));
const friendlyUiShowAvatarDecorationsInNavBtn = computed(defaultStore.makeGetterSetter('friendlyUiShowAvatarDecorationsInNavBtn'));

watch([
	renameTheButtonInPostFormToNya,
], async () => {
	await defaultStore.set('renameTheButtonInPostFormToNyaManualSet', true);
});

watch([
	expandOnNoteClick,
	reactableRemoteReactionEnabled,
	mobileHeaderChange,
	renameTheButtonInPostFormToNya,
	enableWidgetsArea,
	friendlyUiEnableNotificationsArea,
], async () => {
	await reloadAsk({ reason: i18n.ts.reloadToApplySetting, unison: true });
});

const headerActions = computed(() => []);

const headerTabs = computed(() => []);

definePageMetadata(() => ({
	title: 'acuaskey',
	icon: 'ti ti-bulb-filled',
}));
</script>
