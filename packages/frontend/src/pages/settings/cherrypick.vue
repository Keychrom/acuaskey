<!--
SPDX-FileCopyrightText: syuilo and misskey-project & noridev and Acuaskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<div class="_gaps_m">
	<FormSection first>
		<template #label>{{ i18n.ts._Acuaskey.function }}</template>
		<template #description>{{ i18n.ts._Acuaskey.functionDescription }}</template>
		<div class="_gaps_m">
			<MkSwitch v-model="nicknameEnabled">
				{{ i18n.ts._Acuaskey.nickname }}
				<template #caption>{{ i18n.ts._Acuaskey.nicknameDescription }}</template>
			</MkSwitch>

			<div class="_gaps_s">
				<MkSwitch v-model="useEnterToSend">
					<template #label>{{ i18n.ts._Acuaskey.useEnterToSend }}</template>
					<template #caption>{{ i18n.ts._Acuaskey.useEnterToSendDescription }}</template>
				</MkSwitch>
				<MkSwitch v-model="postFormVisibilityHotkey">
					<template #label>{{ i18n.ts._Acuaskey.postFormVisibilityHotkey }}</template>
					<template #caption>{{ i18n.ts._Acuaskey.postFormVisibilityHotkeyDescription }}</template>
				</MkSwitch>
				<MkSwitch v-model="showRenoteConfirmPopup">
					<template #label>{{ i18n.ts._Acuaskey.showRenoteConfirmPopup }}</template>
					<template #caption>{{ i18n.ts._Acuaskey.showRenoteConfirmPopupDescription }}</template>
				</MkSwitch>
				<MkSwitch v-model="expandOnNoteClick">
					<template #label>{{ i18n.ts._Acuaskey.expandOnNoteClick }}</template>
					<template #caption>{{ i18n.ts._Acuaskey.expandOnNoteClickDescription }}</template>
				</MkSwitch>
				<MkSelect v-if="expandOnNoteClick" v-model="expandOnNoteClickBehavior" style="margin-left: 44px;">
					<template #label>{{ i18n.ts._Acuaskey.expandOnNoteClickBehavior }}</template>
					<option value="click">{{ i18n.ts._nsfwOpenBehavior.click }}</option>
					<option value="doubleClick">{{ i18n.ts._nsfwOpenBehavior.doubleClick }}</option>
				</MkSelect>
			</div>

			<div>
				<MkRadios v-model="displayHeaderNavBarWhenScroll">
					<template #label>{{ i18n.ts._Acuaskey.displayHeaderNavBarWhenScroll }}</template>
					<option value="all">{{ i18n.ts._Acuaskey._displayHeaderNavBarWhenScroll.all }}</option>
					<option value="hideHeaderOnly">{{ i18n.ts._Acuaskey._displayHeaderNavBarWhenScroll.hideHeaderOnly }}</option>
					<option value="hideHeaderFloatBtn">{{ i18n.ts._Acuaskey._displayHeaderNavBarWhenScroll.hideHeaderFloatBtn }}</option>
					<option value="hideFloatBtnOnly">{{ i18n.ts._Acuaskey._displayHeaderNavBarWhenScroll.hideFloatBtnOnly }}</option>
					<option value="hideFloatBtnNavBar">{{ i18n.ts._Acuaskey._displayHeaderNavBarWhenScroll.hideFloatBtnNavBar }}</option>
					<option value="hide">{{ i18n.ts._Acuaskey._displayHeaderNavBarWhenScroll.hide }}</option>
				</MkRadios>
			</div>
		</div>
	</FormSection>

	<FormSection>
		<template #label>{{ i18n.ts._Acuaskey.patch }}</template>
		<template #description>{{ i18n.ts._Acuaskey.patchDescription }}</template>
		<div class="_gaps_m">
			<MkSwitch v-model="reactableRemoteReactionEnabled">{{ i18n.ts._Acuaskey.reactableRemoteReaction }}</MkSwitch>
			<MkSwitch v-model="showFollowingMessageInsteadOfButtonEnabled">{{ i18n.ts._Acuaskey.showFollowingMessageInsteadOfButton }}</MkSwitch>
			<MkSwitch v-model="mobileHeaderChange">{{ i18n.ts._Acuaskey.mobileHeaderChange }}</MkSwitch>
			<MkSwitch v-model="renameTheButtonInPostFormToNya">
				{{ i18n.ts._Acuaskey.renameTheButtonInPostFormToNya }}
				<template #caption>{{ i18n.ts._Acuaskey.renameTheButtonInPostFormToNyaDescription }}</template>
			</MkSwitch>
		</div>
	</FormSection>

	<FormSection>
		<template #label>UI</template>
		<div class="_gaps_m">
			<MkSwitch v-model="enableWidgetsArea">{{ i18n.ts._Acuaskey.enableWidgetsArea }}</MkSwitch>

			<div class="_gaps_s" style="margin: 0 10px;">
				<div style="font-weight: bold; padding: 0.5em 0 0 0; margin: 0 0 8px 0;">Friendly UI</div>

				<MkSwitch v-model="friendlyUiEnableNotificationsArea">
					{{ i18n.ts._Acuaskey.friendlyUiEnableNotificationsArea }}
				</MkSwitch>
				<MkSwitch v-model="enableLongPressOpenAccountMenu">
					<template #label>{{ i18n.ts._Acuaskey.enableLongPressOpenAccountMenu }}</template>
					<template #caption>{{ i18n.ts._Acuaskey.enableLongPressOpenAccountMenuDescription }}</template>
				</MkSwitch>
				<MkSwitch v-model="friendlyUiShowAvatarDecorationsInNavBtn">{{ i18n.ts._Acuaskey.friendlyUiShowAvatarDecorationsInNavBtn }}</MkSwitch>
			</div>
		</div>
	</FormSection>

	<FormSection>
		<template #label><i class="ti ti-flask"/> {{ i18n.ts.AcuaskeyLabs }}</template>
		<template #description>{{ i18n.ts.AcuaskeyLabsDescription }}</template>
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
	title: 'Acuaskey',
	icon: 'ti ti-bulb-filled',
}));
</script>
