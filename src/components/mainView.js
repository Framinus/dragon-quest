import React from 'react';
import ControlledCarousel from '../containers/card_carousel';
import CallDragonBtn from './callDragonBtn';
import MergeBtn from './mergeBtn';
import PrepareToMergeBtn from './prepareToMergeBtn';

export default function MainView(props) {
  return (
    <div className="main-view-container">
      <div className="dragon-collection-description">
        <div className="control-btns">
          <CallDragonBtn
            callDragon={props.callDragon}
            mergeMode={props.mergeMode}
          />
          <MergeBtn
            mergeMode={props.mergeMode}
            toggleMergeMode={props.toggleMergeMode}
          />
          <PrepareToMergeBtn
            mergingDragons={props.mergingDragons}
            toggleMergeContainer={props.toggleMergeContainer}
          />
        </div>
      </div>
      <div className="carousel">
        <ControlledCarousel
          store={props.store}
          toggleFightMode={props.toggleFightMode}
          mergeMode={props.mergeMode}
        />
      </div>
    </div>
  );

}
