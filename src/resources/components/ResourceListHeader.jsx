import React from 'react';
import styled from 'styled-components';
import { Box, Typography } from '@material-ui/core';

import { ToggleButton } from '../../common/components/ToggleButton';

export const statusIds = {
  all: 'all',
  open: 'open',
  waitlisted: 'waitlisted',
  closed: 'closed',
};

export const sortByIds = {
  nameAsc: 'name-asc',
  nameDesc: 'name-desc',
  amount: 'amount',
};

const VerticalDivider = styled.div`
  height: 15px;
  width: 1px;
  background-color: black;
  margin: 0 15px;
`;

export const ResourceListHeader = ({
  activeStatuses,
  sortBy,
  onStatusesChange,
  onSortByChange,
}) => {
  const isStatusActive = (id) => {
    return activeStatuses.includes(id);
  };

  const onStatusClick = (e) => {
    const id = e.target.id;

    if (id === statusIds.all) {
      onStatusesChange([id]);
    } else {
      const statusesWithoutAll = activeStatuses.filter(
        (status) => status !== statusIds.all,
      );

      if (isStatusActive(id)) {
        onStatusesChange(statusesWithoutAll.filter((status) => status !== id));
      } else {
        onStatusesChange([...statusesWithoutAll, id]);
      }
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Typography>Would you like to see?</Typography>
        <Box ml={2} />
        <ToggleButton
          id={statusIds.all}
          active={isStatusActive(statusIds.all)}
          onClick={onStatusClick}
        >
          All
        </ToggleButton>
        <Box ml={1} />
        <ToggleButton
          id={statusIds.open}
          active={isStatusActive(statusIds.open)}
          onClick={onStatusClick}
        >
          Open
        </ToggleButton>
        <Box ml={1} />
        <ToggleButton
          id={statusIds.waitlisted}
          active={isStatusActive(statusIds.waitlisted)}
          onClick={onStatusClick}
        >
          Waitlisted
        </ToggleButton>
        <Box ml={1} />
        <ToggleButton
          id={statusIds.closed}
          active={isStatusActive(statusIds.closed)}
          onClick={onStatusClick}
        >
          Closed
        </ToggleButton>
      </Box>

      <Box display="flex" alignItems="center">
        <Typography variant="caption" color="textSecondary">
          SORT:
        </Typography>
        <Box ml={2} />
        <ToggleButton
          id={sortByIds.nameAsc}
          variant="text"
          active={sortBy === sortByIds.nameAsc}
          onClick={() => onSortByChange(sortByIds.nameAsc)}
        >
          A-Z
        </ToggleButton>
        <VerticalDivider />
        <ToggleButton
          id={sortByIds.nameDesc}
          variant="text"
          active={sortBy === sortByIds.nameDesc}
          onClick={() => onSortByChange(sortByIds.nameDesc)}
        >
          Z-A
        </ToggleButton>
        <VerticalDivider />
        <ToggleButton
          id={sortByIds.amount}
          variant="text"
          active={sortBy === sortByIds.amount}
          onClick={() => onSortByChange(sortByIds.amount)}
        >
          $
        </ToggleButton>
      </Box>
    </Box>
  );
};