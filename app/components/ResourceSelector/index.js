import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

const ResourceSelectorWrapper = styled.div`
  width: 100%;
  height: 4rem;
  border-left: 2px solid #3883bb;
  border-right: 2px solid #3883bb;
  border-top: 2px solid #3883bb;
  display: flex;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const TodayWrapper = styled.div`
  width: calc(5.05rem - 2px);
  height: 100%;
  text-align: center;
  padding: 0.5rem;
`;

TodayWrapper.Button = styled.div`
  border-radius: 4px;
  background: #0071c5;
  color: #ffffff;
  width: 100%;
  font-size: 1rem;
  line-height: 2.8;
  height: 100%;
  cursor: pointer;
`;

const ResourceSliderWrapper = styled.div`
  width: calc(100% - 5.05rem - (calc((100vw - 5.05rem) / 7)) + 1px);
  position: relative;
`;

const ResourceWrapper = styled.div`
  height: calc(4rem - 2px);
  position: relative;
  border-left: 1px solid #3883bb;
`;

const Resource = styled.div`
  text-align: center;
  padding: 0.25rem;
`;

Resource.Avatar = styled.div`
  padding: 2px;

  & img {
    width: 3rem;
    border-radius: 50%;
  }
`;

Resource.OrderNumber = styled.div`
  position: absolute;
  top: 2px;
  right: 2px;
  background: #3883bb;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  color: #ffffff;
  padding: 2px;
  font-size: 9px;
  line-height: 1.3;
`;

Resource.Title = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background: #ffffff;
  width: 100%;
  opacity: 0.75;
  text-align: center;
  padding-bottom: 4px;
  font-size: 13px;
  line-height: 1.3;
`;

const PrevButton = styled.div`
  color: #3883bb;
  font-size: 2rem;
  line-height: 2rem;
  cursor: pointer;
`;

const NextButton = styled.div`
  color: #3883bb;
  font-size: 2rem;
  line-height: 2rem;
  cursor: pointer;
`;

const WaitingHeader = styled.div`
  width: calc((100vw - 5.05rem) / 7);
  text-align: center;
  line-height: 64px;
  font-size: 18px;
  color: #333333;
  background: #f4f4f5;
  border-left: 1px solid #3883bb;
`;

class ResourceSelector extends React.Component {
  onPrevClick(event, previousSlide) {
    previousSlide(event);
    // const { days, onChangeWeek } = this.props;
    // onChangeWeek(days[0].subtract(1, 'w').format('YYYY-MM-DD'));
  }

  onNextClick(event, nextSlide) {
    nextSlide(event);
    // const { days, onChangeWeek } = this.props;
    // onChangeWeek(days[0].add(1, 'w').format('YYYY-MM-DD'));
  }

  // onDayClick(day) {
  // const { onChangeToday } = this.props;
  // onChangeToday(day.format('YYYY-MM-DD'));
  // }

  onTodayClick() {
    const { onChangeToday } = this.props;
    onChangeToday(moment().format('YYYY-MM-DD'));
  }

  renderResource(resource) {
    return (
      <>
        <Resource.Avatar>
          <img src={resource.imageUrl} alt={resource.orderNumber} />
        </Resource.Avatar>
        <Resource.OrderNumber className="app-resource__order-number">
          {resource.orderNumber}
        </Resource.OrderNumber>
        <Resource.Title className="app-resource__title">
          {resource.title}
        </Resource.Title>
      </>
    );
  }

  renderResources(resource, index) {
    // const { selectedResource } = this.props;
    return (
      <ResourceWrapper key={index}>
        <Resource onClick={() => this.onDayClick()}>
          {this.renderResource(resource)}
        </Resource>
      </ResourceWrapper>
    );
  }

  render() {
    const { resources } = this.props;
    return (
      <ResourceSelectorWrapper>
        <TodayWrapper>
          <TodayWrapper.Button onClick={() => this.onTodayClick()}>
            Today
          </TodayWrapper.Button>
        </TodayWrapper>
        <ResourceSliderWrapper>
          <Carousel
            dragging={false}
            slidesToShow={6}
            renderBottomCenterControls={() => ''}
            renderCenterLeftControls={({ previousSlide }) => (
              <PrevButton onClick={ev => this.onPrevClick(ev, previousSlide)}>
                <FaCaretLeft />
              </PrevButton>
            )}
            renderCenterRightControls={({ nextSlide }) => (
              <NextButton onClick={ev => this.onNextClick(ev, nextSlide)}>
                <FaCaretRight />
              </NextButton>
            )}
          >
            {resources.map((resource, index) =>
              this.renderResources(resource, index),
            )}
          </Carousel>
        </ResourceSliderWrapper>
        <WaitingHeader>Waiting</WaitingHeader>
      </ResourceSelectorWrapper>
    );
  }
}

ResourceSelector.propTypes = {
  resources: PropTypes.array,
  onChangeToday: PropTypes.func,
};

export default ResourceSelector;
