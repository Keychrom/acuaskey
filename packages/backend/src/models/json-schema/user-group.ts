/*
 * SPDX-FileCopyrightText: syuilo and misskey-project & Nekoboshi_Suiren&Popmix Group and Acuaskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export const packedUserGroupSchema = {
	type: 'object',
	properties: {
		id: {
			type: 'string',
			optional: false, nullable: false,
			format: 'id',
			example: 'xxxxxxxxxx',
		},
		createdAt: {
			type: 'string',
			optional: false, nullable: false,
			format: 'date-time',
		},
		name: {
			type: 'string',
			optional: false, nullable: false,
		},
		ownerId: {
			type: 'string',
			nullable: false, optional: false,
			format: 'id',
		},
		userIds: {
			type: 'array',
			nullable: false, optional: true,
			items: {
				type: 'string',
				nullable: false, optional: false,
				format: 'id',
			},
		},
	},
} as const;
