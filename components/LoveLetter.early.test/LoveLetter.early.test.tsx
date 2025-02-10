
// Unit tests for: LoveLetter

import React from 'react'
import LoveLetter from '../LoveLetter';
import { act, render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";

// Mocking the useSpring hook from react-spring
jest.mock("react-spring", () => ({
  useSpring: () => ({
    opacity: 1,
  }),
}));

describe('LoveLetter() LoveLetter method', () => {
  // Happy Path Tests
  describe('Happy Paths', () => {
    it('should render the initial heading and empty letter content', () => {
      // Test to ensure the component renders with the initial heading and empty content
      render(<LoveLetter onComplete={jest.fn()} />);
      expect(screen.getByText('A Letter from My Heart')).toBeInTheDocument();
      expect(screen.getByText('', { exact: false })).toBeInTheDocument();
    });

    it('should gradually display the love letter text', () => {
      // Test to simulate the gradual display of the love letter text
      jest.useFakeTimers();
      render(<LoveLetter onComplete={jest.fn()} />);
      
      act(() => {
        jest.advanceTimersByTime(50 * loveLetter.length);
      });

      expect(screen.getByText(loveLetter, { exact: false })).toBeInTheDocument();
      jest.useRealTimers();
    });

    it('should call onComplete after the letter is fully displayed', () => {
      // Test to ensure onComplete is called after the letter is fully displayed
      jest.useFakeTimers();
      const onCompleteMock = jest.fn();
      render(<LoveLetter onComplete={onCompleteMock} />);
      
      act(() => {
        jest.advanceTimersByTime(50 * loveLetter.length + 5000);
      });

      expect(onCompleteMock).toHaveBeenCalled();
      jest.useRealTimers();
    });
  });

  // Edge Case Tests
  describe('Edge Cases', () => {
    it('should handle rapid unmounting gracefully', () => {
      // Test to ensure the component handles unmounting before completion without errors
      jest.useFakeTimers();
      const onCompleteMock = jest.fn();
      const { unmount } = render(<LoveLetter onComplete={onCompleteMock} />);
      
      act(() => {
        jest.advanceTimersByTime(50 * (loveLetter.length / 2));
      });

      unmount();
      expect(onCompleteMock).not.toHaveBeenCalled();
      jest.useRealTimers();
    });

    it('should not call onComplete if the component is unmounted before completion', () => {
      // Test to ensure onComplete is not called if the component is unmounted early
      jest.useFakeTimers();
      const onCompleteMock = jest.fn();
      const { unmount } = render(<LoveLetter onComplete={onCompleteMock} />);
      
      act(() => {
        jest.advanceTimersByTime(50 * (loveLetter.length / 2));
      });

      unmount();
      act(() => {
        jest.advanceTimersByTime(50 * (loveLetter.length / 2) + 5000);
      });

      expect(onCompleteMock).not.toHaveBeenCalled();
      jest.useRealTimers();
    });
  });
});

// End of unit tests for: LoveLetter
