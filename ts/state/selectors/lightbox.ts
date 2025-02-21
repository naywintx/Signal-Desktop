// Copyright 2022 Signal Messenger, LLC
// SPDX-License-Identifier: AGPL-3.0-only

import { createSelector } from 'reselect';
import type { MediaItemType } from '../../types/MediaItem';
import type { StateType } from '../reducer';
import type { LightboxStateType } from '../ducks/lightbox';

export const getLightboxState = (state: StateType): LightboxStateType =>
  state.lightbox;

export const shouldShowLightbox = createSelector(
  getLightboxState,
  ({ isShowingLightbox }): boolean => isShowingLightbox
);

export const getIsViewOnce = createSelector(
  getLightboxState,
  (state): boolean => (state.isShowingLightbox ? state.isViewOnce : false)
);

export const getSelectedIndex = createSelector(
  getLightboxState,
  (state): number => {
    if (!state.isShowingLightbox) {
      return 0;
    }

    const index = state.media.findIndex(
      item => item.attachment.path === state.selectedAttachmentPath
    );

    return index > 0 ? index : 0;
  }
);

export const getMedia = createSelector(
  getLightboxState,
  (state): Array<MediaItemType> => (state.isShowingLightbox ? state.media : [])
);
