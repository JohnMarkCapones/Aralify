import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { XpDecayService } from '../../gamification/services/xp-decay.service';

@Injectable()
export class XpDecayJob {
  private readonly logger = new Logger(XpDecayJob.name);

  constructor(private readonly xpDecayService: XpDecayService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleXpDecay() {
    this.logger.log('Starting daily XP decay job...');
    const result = await this.xpDecayService.processDecay();
    this.logger.log(
      `XP decay complete: ${result.usersAffected} users affected, ${result.totalXpDecayed} XP decayed`,
    );
  }
}
