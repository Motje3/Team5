using Xunit;

namespace backend_api.Tests
{
    public class MathTests
    {
        [Fact]
        public void Addition_WorksCorrectly()
        {
            // Arrange
            int a = 2, b = 3;

            // Act
            int result = a + b;

            // Assert
            Assert.Equal(5, result);
        }
    }
}
