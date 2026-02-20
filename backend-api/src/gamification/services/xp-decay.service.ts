import { Injectable, Logger } from '@nestjs/common';
import { XpSource } from '@prisma/client';
import { GamificationRepository } from '../gamification.repository';
import { XP_DECAY } from '../constants';

export interface DecayResult {
  usersAffected: number;
  totalXpDecayed: number;
}

@Injectable()
export class XpDecayService {
  private readonly logger = new Logger(XpDecayService.name);

  constructor(private readonly repository: GamificationRepository) {}

  /**
   * Process XP decay for all inactive users.
   * Deducts flat 25 XP/day after 7 days of inactivity.
   * Never reduces XP below 0. Levels are preserved (no demotion).
   */
  async processDecay(): Promise<DecayResult> {
    const inactiveUsers = await this.repository.getInactiveUsers(
      XP_DECAY.INACTIVE_DAYS_THRESHOLD,
    );

    let usersAffected = 0;
    let totalXpDecayed = 0;

    for (const user of inactiveUsers) {
      const deduction = Math.min(XP_DECAY.DAILY_DECAY_AMOUNT, user.xpTotal);
      if (deduction <= 0) continue;

      const result = await this.repository.deductXpAtomic(
        user.id,
        deduction,
        XpSource.DECAY,
        `Daily XP decay: ${deduction} XP (inactive ${XP_DECAY.INACTIVE_DAYS_THRESHOLD}+ days)`,
      );

      if (result) {
        usersAffected++;
        totalXpDecayed += deduction;
        this.logger.debug(
          `Decayed ${deduction} XP from user ${user.id} (was ${user.xpTotal}, now ${result.xpTotal})`,
        );
      }
    }

    return { usersAffected, totalXpDecayed };
  }
}
