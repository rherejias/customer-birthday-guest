import React, { useEffect, useState } from "react";
import { fileReader, calculateDistance } from "./helper";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function InviteList({ initialData = [] }) {

  const [partners, setPartners] = useState(initialData);

  useEffect(() => {
    const fetchData = async () => {
      const raw = await fileReader()
      const data = raw.filter(partner => partner !== "");

      const dataWithDistance = data.map(partner => {
        const parsedPartner = JSON.parse(partner);
        const { latitude, longitude } = parsedPartner;

        parsedPartner.distance = calculateDistance(latitude, longitude).toFixed(2);

        return parsedPartner;
      })

      setPartners(dataWithDistance.filter(partner => partner.distance <= 100).sort((a, b) => {
        return a.partner_id - b.partner_id;
      }));
    }

    fetchData()
      .catch(console.error);
  }, [])

  return (
    <List>
      {partners.map((partner, index) => {
        const { name, partner_id } = partner;
        return (
          <ListItem key={partner_id} disablePadding={true} data-testid={`invited-list-${index}`}>
            <ListItemText
              primary={`${partner_id} ${name}`}
            />
          </ListItem>
        )
      })}
    </List>
  );
}

export default InviteList;
