using NUnit.Framework;

namespace TestProject1;

[TestFixture]
public class UnitTest1
{
    [Test]
    public void DummyTest_Passes()
    {
        Assert.That(1 + 1, Is.EqualTo(2));
    }
}