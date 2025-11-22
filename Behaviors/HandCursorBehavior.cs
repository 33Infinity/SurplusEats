using System;
using System.Linq;
using Microsoft.Maui.Controls;

namespace SurplusEats.Behaviors {
    public class HandCursorBehavior : Behavior<VisualElement> {
#if WINDOWS
        Microsoft.UI.Xaml.FrameworkElement? _platformView;
        static readonly System.Reflection.PropertyInfo? CursorProperty =
            typeof(Microsoft.UI.Xaml.UIElement).GetProperty("ProtectedCursor",
                System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.NonPublic)
            ?? typeof(Microsoft.UI.Xaml.UIElement).GetProperty("PointerCursor",
                System.Reflection.BindingFlags.Instance | System.Reflection.BindingFlags.Public);
#endif

        protected override void OnAttachedTo(VisualElement bindable) {
            base.OnAttachedTo(bindable);
#if WINDOWS
            bindable.HandlerChanged += OnHandlerChanged;
            TryAttach(bindable);
#endif
        }

        protected override void OnDetachingFrom(VisualElement bindable) {
#if WINDOWS
            bindable.HandlerChanged -= OnHandlerChanged;
            DetachPlatform();
#endif
            base.OnDetachingFrom(bindable);
        }

#if WINDOWS
        void OnHandlerChanged(object? sender, EventArgs e) {
            if (sender is VisualElement element) {
                TryAttach(element);
            }
        }

        void TryAttach(VisualElement element) {
            if (element.Handler?.PlatformView is Microsoft.UI.Xaml.FrameworkElement frameworkElement) {
                if (ReferenceEquals(_platformView, frameworkElement)) {
                    return;
                }

                DetachPlatform();

                _platformView = frameworkElement;
                _platformView.PointerEntered += OnPointerEntered;
                _platformView.PointerExited += OnPointerExited;
            }
        }

        void DetachPlatform() {
            if (_platformView != null) {
                _platformView.PointerEntered -= OnPointerEntered;
                _platformView.PointerExited -= OnPointerExited;
                _platformView = null;
            }
        }

        void OnPointerEntered(object sender, Microsoft.UI.Xaml.Input.PointerRoutedEventArgs e) {
            if (_platformView != null && CursorProperty != null) {
                var handCursor = Microsoft.UI.Input.InputSystemCursor.Create(Microsoft.UI.Input.InputSystemCursorShape.Hand);
                CursorProperty.SetValue(_platformView, handCursor);
            }
        }

        void OnPointerExited(object sender, Microsoft.UI.Xaml.Input.PointerRoutedEventArgs e) {
            if (_platformView != null && CursorProperty != null) {
                var arrowCursor = Microsoft.UI.Input.InputSystemCursor.Create(Microsoft.UI.Input.InputSystemCursorShape.Arrow);
                CursorProperty.SetValue(_platformView, arrowCursor);
            }
        }
#endif
    }

    public static class PointerCursor {
        public static readonly BindableProperty IsEnabledProperty =
            BindableProperty.CreateAttached(
                "IsEnabled",
                typeof(bool),
                typeof(PointerCursor),
                false,
                propertyChanged: OnIsEnabledChanged);

        public static bool GetIsEnabled(BindableObject view) => (bool)view.GetValue(IsEnabledProperty);

        public static void SetIsEnabled(BindableObject view, bool value) => view.SetValue(IsEnabledProperty, value);

        static void OnIsEnabledChanged(BindableObject bindable, object oldValue, object newValue) {
            if (bindable is not VisualElement element) {
                return;
            }

            var enabled = (bool)newValue;
            var existingBehavior = element.Behaviors.OfType<HandCursorBehavior>().FirstOrDefault();

            if (enabled) {
                if (existingBehavior == null) {
                    element.Behaviors.Add(new HandCursorBehavior());
                }
            } else if (existingBehavior != null) {
                element.Behaviors.Remove(existingBehavior);
            }
        }
    }
}


