/*
 * SPDX-FileCopyrightText: Nekoboshi_Suiren&Popmix Group and Acuaskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import * as os from '@/os.js';

export function donateAcuaskey(ev: MouseEvent) {
	os.popupMenu([{
		text: '募金の募集はしていません',

	}], ev.currentTarget ?? ev.target);
}
