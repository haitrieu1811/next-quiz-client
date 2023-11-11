"use client";

import range from "lodash/range";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DateSelectProps = {
  onChange?: (date: Date) => void;
  value?: Date;
};

type DateType = {
  date: number;
  month: number;
  year: number;
};

const DateSelect = ({ onChange, value }: DateSelectProps) => {
  const [date, setDate] = useState<DateType>({
    date: 1,
    month: 1,
    year: 1950,
  });

  useEffect(() => {
    if (!value) return;
    setDate({
      date: value.getDate() || 1,
      month: value.getMonth() || 1,
      year: value.getFullYear() || 1950,
    });
  }, [value]);

  const changeDate = (value: string) => {
    const newDate: DateType = {
      ...date,
      date: Number(value),
    };
    setDate(newDate);
    onChange && onChange(new Date(date.year, date.month, date.date));
  };

  const changeMonth = (value: string) => {
    const newDate: DateType = {
      ...date,
      month: Number(value),
    };
    setDate(newDate);
    onChange && onChange(new Date(date.year, date.month, date.date));
  };

  const changeYear = (value: string) => {
    const newDate: DateType = {
      ...date,
      year: Number(value),
    };
    setDate(newDate);
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date));
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-4">
        <Select onValueChange={changeDate}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={date.date} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Ngày</SelectLabel>
              <ScrollArea className="h-[200px] w-full">
                {range(1, 32).map((date) => (
                  <SelectItem key={date} value={String(date)}>
                    {date}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-4">
        <Select onValueChange={changeMonth}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={date.month} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tháng</SelectLabel>
              <ScrollArea className="h-[200px] w-full">
                {range(0, 12).map((month) => (
                  <SelectItem key={month} value={String(month)}>
                    {month + 1}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-4">
        <Select onValueChange={changeYear}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={date.year} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Năm</SelectLabel>
              <ScrollArea className="h-[200px] w-full">
                {range(1910, 2024).map((year) => (
                  <SelectItem key={year} value={String(year)}>
                    {year}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

DateSelect.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.instanceOf(Date),
};

export default DateSelect;
