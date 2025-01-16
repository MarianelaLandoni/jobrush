import { Application } from "./application.model";

export interface Column {
  id: string;
  name: string;
  icon: string;
  color?: string;
  applications: Application[];
}
