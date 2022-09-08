import {Card, Box, Typography} from '@mui/material/';

function QuoteCard({ quote }) {
  return (
    <Card sx={{maxWidth: 300}}>
        <Box sx={{p: '16px'}}>
            <Typography>{quote.content}</Typography>
            <Typography sx={{mt: 1}} color='text.secondary' variant='body2'>{quote.author}</Typography>
        </Box>
    </Card>
  )
}

export default QuoteCard