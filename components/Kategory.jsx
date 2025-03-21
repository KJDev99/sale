"use client";
import Search from "antd/es/input/Search";
import React, { useRef, useState } from "react";
export default function Kategory() {
  return (
    <div className="kategory">
      <div className="kategory_row">
        <div className="kategory_col">
          <p>Квартира мечты:удобство, комфорт и выгодная цена</p>
        </div>
        <div className="kategory_col2">
          <p>Надежный автомобиль с пробегом – идеальный выбор для вас!</p>
        </div>
      </div>
    </div>
  );
}
