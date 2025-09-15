import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AutoSaveService {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private enabled = true;
  private intervalMs = 3000;
  private callbackFn: () => void = () => {};
  private lastSaveTime = 0;
  private minimumInterval = 1000;
  private saveInProgress = false;
  
  // Events for external subscribers
  public onSaveSuccess = new Subject<void>();
  public onSaveError = new Subject<Error>();
  public onStateChange = new Subject<{ enabled: boolean, interval: number }>();

  /**
   * Start the auto-save service
   * @param callback The function to execute on each save
   * @param immediate Whether to execute the callback immediately
   * @param forceRestart Whether to force restart the interval if already running
   */
  start(callback: () => void, immediate = false, forceRestart = false): void {
    if (this.intervalId && !forceRestart) {
      return;
    }

    this.stop(); // Ensure any existing interval is cleared
    
    this.callbackFn = callback;

    if (immediate) {
      this.executeSave();
    }

    if (this.enabled) {
      this.intervalId = setInterval(() => this.executeSave(), this.intervalMs);
      this.onStateChange.next({ enabled: true, interval: this.intervalMs });
    }
  }

  /**
   * Stop the auto-save service
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.onStateChange.next({ enabled: false, interval: this.intervalMs });
    }
  }

  /**
   * Toggle the auto-save state
   * @returns Current enabled state
   */
  toggle(): boolean {
    this.enabled = !this.enabled;
    if (this.enabled && this.callbackFn) {
      this.start(this.callbackFn, false, true);
    } else {
      this.stop();
    }
    return this.enabled;
  }

  /**
   * Check if auto-save is enabled
   */
  isEnabled(): boolean {
    return this.enabled;
  }

  /**
   * Set the auto-save interval
   * @param ms Interval in milliseconds (minimum 1000ms enforced)
   */
  setInterval(ms: number): void {
    this.intervalMs = Math.max(ms, this.minimumInterval);
    
    if (this.enabled && this.callbackFn) {
      this.start(this.callbackFn, false, true);
    }
    
    this.onStateChange.next({ enabled: this.enabled, interval: this.intervalMs });
  }

  /**
   * Get the current interval setting
   */
  getInterval(): number {
    return this.intervalMs;
  }

  /**
   * Manually trigger a save
   */
  manualSave(): void {
    this.executeSave();
  }

  /**
   * Execute the save operation with safeguards
   */
  private async executeSave(): Promise<void> {
    const now = Date.now();
    
    // Prevent too frequent saves and overlapping saves
    if (now - this.lastSaveTime < this.minimumInterval || this.saveInProgress) {
      return;
    }

    this.saveInProgress = true;
    
    try {
      await this.callbackFn();
      this.lastSaveTime = now;
      this.onSaveSuccess.next();
    } catch (error) {
      console.error('Auto-save failed:', error);
      this.onSaveError.next(error instanceof Error ? error : new Error(String(error)));
    } finally {
      this.saveInProgress = false;
    }
  }

  /**
   * Clean up on service destruction
   */
  ngOnDestroy() {
    this.stop();
    this.onSaveSuccess.complete();
    this.onSaveError.complete();
    this.onStateChange.complete();
  }
}