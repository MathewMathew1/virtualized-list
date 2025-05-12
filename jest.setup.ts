beforeEach(() => {
   jest .spyOn(window, 'requestAnimationFrame') .mockImplementation((callback: FrameRequestCallback): number => { callback(0); return 0; });
});

afterEach(() => {
  (window.requestAnimationFrame as jest.Mock).mockRestore();
});