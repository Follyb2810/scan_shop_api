#!/usr/bin/env ts-node
/**
 * Manual demo seed CLI.
 * Demo data also auto-runs on boot when AUTO_SEED_DEMO=true (default in development).
 *
 * Usage:
 *   npm run seed:demo
 */
import {
  bootstrapInfrastructure,
  shutdownInfrastructure,
} from "../infrastructure/bootstrap";
import { seedDemoData } from "./demo-data";

async function main() {
  await bootstrapInfrastructure();
  await seedDemoData();
  await shutdownInfrastructure();
}

main().catch(async (err) => {
  console.error(err);
  await shutdownInfrastructure().catch(() => undefined);
  process.exit(1);
});
