"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import 'moment/locale/fr'; // Importez la locale française si vous souhaitez utiliser le français

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="bg-white p-4 rounded-md">
      <Calendar 
        onChange={onChange} 
        value={value} 
        locale="fr" // Ou 'en-US' si vous préférez l'anglais
      />
    </div>
  );
};

export default EventCalendar;