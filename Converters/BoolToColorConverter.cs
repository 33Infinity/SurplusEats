using System.Globalization;

namespace SurplusEats.Converters {
    public class BoolToColorConverter : IValueConverter {
        public object Convert(object? value, Type targetType, object? parameter, CultureInfo culture) {
            if (value is bool boolValue && parameter is string colorPair) {
                var colors = colorPair.Split('|');
                if (colors.Length == 2) {
                    return Color.FromArgb(boolValue ? colors[0] : colors[1]);
                }
            }
            return Colors.Transparent;
        }

        public object ConvertBack(object? value, Type targetType, object? parameter, CultureInfo culture) {
            throw new NotImplementedException();
        }
    }
}



