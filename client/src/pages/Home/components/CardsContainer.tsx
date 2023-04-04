import styled from '@emotion/styled';

import Card, { CardItem } from './Card';

export interface Cards {
  cards: CardItem[];
}

const CardsContainer = ({ cards }: Cards) => {
  return (
    <Grid>
      {cards.map((oneCardData) => {
        return <Card key={oneCardData.id} cardData={oneCardData} />;
      })}
    </Grid>
  );
};

const Grid = styled.div`
  /* if want Grid */
  /* display: grid; */
  /* grid-template-columns: repeat(auto-fill, minmax(175px, 1fr)); */

  /* if want Flex */
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  /* Other */
  justify-items: center;
  gap: 3rem 1.6rem;
`;

export default CardsContainer;