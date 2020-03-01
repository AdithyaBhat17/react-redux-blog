import React from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';

const TagsCard = ({ tags, handleFilter, selectedTags, clearFilters }) => {
    return (
        <Card>
            <Card.Content>
                <Card.Header>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={10}><h3>Trending Now</h3></Grid.Column>
                            <Grid.Column width={6}>
                                <Button size='mini' color='blue' content='Clear' disabled={selectedTags.length === 0} onClick={clearFilters} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Card.Header>
            </Card.Content>
            <Card.Content>
                {
                    tags?.map((tag, index) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                            <Card.Content key={index} as="a" onClick={() => handleFilter(tag)} className={isSelected ? 'tag-selected' : 'tag'}>
                                <p>#{tag}</p>
                            </Card.Content>
                        );
                    })
                }
            </Card.Content>
        </Card>
    )
}

export default TagsCard;