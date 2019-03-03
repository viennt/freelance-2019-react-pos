import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';

import LoadingIndicator from 'components/LoadingIndicator';

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
  background: ${props => (props.notEmpty ? '#3883bb' : '#ff1b22')};
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
  componentWillMount() {
    const { loadMembers } = this.props;
    loadMembers({ embed: 'appointments' });
  }

  onPrevClick(event, previousSlide) {
    previousSlide(event);
  }

  onNextClick(event, nextSlide) {
    nextSlide(event);
  }

  afterSlide(index) {
    const { resources, setDisplayedMembers } = this.props;
    setDisplayedMembers(resources.slice(index, index + 6));
  }

  onTodayClick() {
    const { onChangeToday } = this.props;
    onChangeToday(moment().format('DDMMYYYY'));
  }

  renderResource(resource) {
    return (
      <>
        <Resource.Avatar>
          <img src={resource.imageUrl} alt={resource.orderNumber} />
        </Resource.Avatar>
        <Resource.OrderNumber notEmpty={resource.numberOfAppointments}>
          {resource.orderNumber}
        </Resource.OrderNumber>
        <Resource.Title>{resource.title}</Resource.Title>
      </>
    );
  }

  renderResources(resource, index) {
    return (
      <ResourceWrapper key={index}>
        <Resource>{this.renderResource(resource)}</Resource>
      </ResourceWrapper>
    );
  }

  renderLoadingResources(index) {
    return (
      <ResourceWrapper key={index}>
        <Resource>
          <LoadingIndicator />
        </Resource>
      </ResourceWrapper>
    );
  }

  renderCarouselSlide() {
    const { loading, resources } = this.props;
    if (loading) {
      return [1, 2, 3, 4, 5, 6].map(index =>
        this.renderLoadingResources(index),
      );
    }
    return resources.map((resource, index) =>
      this.renderResources(resource, index),
    );
  }

  render() {
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
            afterSlide={slideIndex => this.afterSlide(slideIndex)}
          >
            {this.renderCarouselSlide()}
          </Carousel>
        </ResourceSliderWrapper>
        <WaitingHeader>Waiting</WaitingHeader>
      </ResourceSelectorWrapper>
    );
  }
}

ResourceSelector.propTypes = {
  resources: PropTypes.any,
  onChangeToday: PropTypes.func,
  loadMembers: PropTypes.func,
  setDisplayedMembers: PropTypes.func,
  loading: PropTypes.bool,
};

export default ResourceSelector;
