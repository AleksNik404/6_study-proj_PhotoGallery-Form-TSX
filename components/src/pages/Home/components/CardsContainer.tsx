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
  /* if whant GRID */
  /* display: grid; */
  /* grid-template-columns: repeat(auto-fill, minmax(175px, 1fr)); */

  /* if want FLEX */
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    max-width: 250px;
    flex: 1 0 190px;
  }

  /* Other */
  justify-items: center;
  gap: 3rem 1rem;
`;

export default CardsContainer;
