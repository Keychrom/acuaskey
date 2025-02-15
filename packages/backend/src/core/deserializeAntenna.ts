/*
 * SPDX-FileCopyrightText: Nekoboshi_Suiren&Popmix Group and Acuaskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { MiAntenna } from '@/models/Antenna.js';

export function deserializeAntenna(body: any): MiAntenna {
	return {
		...body,
		lastUsedAt: new Date(body.lastUsedAt),
		user: null,
		userList: null,
	};
}
