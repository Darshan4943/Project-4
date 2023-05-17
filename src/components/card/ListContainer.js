import React from 'react';
import { Grid } from '@mui/material';

import List from './List';
import { useRecoilState } from 'recoil';
import { listsState } from './atom';


const ListContainer = () => {
  const [lists, setLists] = useRecoilState(listsState);

  return (
    <Grid container spacing={2}>
      {lists.map((list, index) => (
        <Grid item xs={4} key={list.id}> 
          <List list={list} listIndex={index} />
        </Grid>
      ))}
    </Grid>
  )
};

export default ListContainer;



