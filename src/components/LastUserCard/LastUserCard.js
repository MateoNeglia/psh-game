import React from 'react';
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import './LastUserCard.scss';

const LastUserCard = ({newStats}) => {
    return (
        <Card className='main-card'>
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">Last User Added</Typography>
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap" className='card-stack'> 
                <Avatar
                alt={newStats.lastUser.login.username}
                src={newStats.lastUser.picture.large}
                sx={{ width: 56, height: 56 }}
                />
                <div className='card-text'>
                    <p><b>Nickname: </b> {newStats.lastUser.login.username}</p>            
                    <p><b>Time updated: </b> {newStats.timestamp}</p>
                </div> 
            </Stack>                       
            </CardContent>
        </Card>
    );

}
export default LastUserCard;











