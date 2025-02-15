/*
 * SPDX-FileCopyrightText: syuilo and misskey-project & Nekoboshi_Suiren&Popmix Group and Acuaskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { StoryObj } from '@storybook/vue3';
import MkUserSetupDialog_MisskeyFlavoredMarkdown from './MkUserSetupDialog.MisskeyFlavoredMarkdown.vue';
export const Default = {
	render(args) {
		return {
			components: {
				MkUserSetupDialog_MisskeyFlavoredMarkdown,
			},
			setup() {
				return {
					args,
				};
			},
			computed: {
				props() {
					return {
						...this.args,
					};
				},
			},
			template: '<MkUserSetupDialog_MisskeyFlavoredMarkdown v-bind="props" />',
		};
	},
	args: {

	},
	parameters: {
		layout: 'centered',
	},
} satisfies StoryObj<typeof MkUserSetupDialog_MisskeyFlavoredMarkdown>;
