import { CareerPage } from '@pages/CareerPage';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_default/career')({
  component: CareerPage,
});
