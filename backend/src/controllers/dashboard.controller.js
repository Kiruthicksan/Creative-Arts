import User from "../models/userSchema.js";
import Order from "../models/order.model.js";

export const getUserStats = async (req, res) => {
  try {
    const today = new Date();
    const lastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      today.getDate(),
    );

    const [
      totalUsers,
      usersLastMonth,
      totalRevenueResult,
      revenueLastMonthResult,
      totalOrders,
      ordersLastMonth,
      activeOrders,
      activeOrdersLastMonth,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ createdAt: { $lte: lastMonth } }),
      Order.aggregate([
        { $match: { status: "paid" } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
      Order.aggregate([
        { $match: { status: "paid", createdAt: { $lte: lastMonth } } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
      Order.countDocuments({ status: "paid" }),
      Order.countDocuments({ status: "paid", createdAt: { $lte: lastMonth } }),
      Order.countDocuments({ status: "pending" }),
      Order.countDocuments({
        status: "pending",
        createdAt: { $lte: lastMonth },
      }),
    ]);

    const totalRevenue = totalRevenueResult[0]?.total || 0;
    const revenueLastMonth = revenueLastMonthResult[0]?.total || 0;

    const userGrowth =
      usersLastMonth === 0
        ? 100
        : ((totalUsers - usersLastMonth) / usersLastMonth) * 100;

    const revenueGrowth =
      revenueLastMonth === 0
        ? 100
        : ((totalRevenue - revenueLastMonth) / revenueLastMonth) * 100;

    const totalOrdersGrowth =
      ordersLastMonth === 0
        ? 100
        : ((totalOrders - ordersLastMonth) / ordersLastMonth) * 100;

    const activeOrdersGrowth =
      activeOrdersLastMonth === 0
        ? 100
        : ((activeOrders - activeOrdersLastMonth) / activeOrdersLastMonth) *
          100;

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        userGrowth: Math.round(userGrowth * 10) / 10,
        totalRevenue,
        revenueGrowth: Math.round(revenueGrowth * 10) / 10,
        totalOrders,
        totalOrdersGrowth: Math.round(totalOrdersGrowth * 10) / 10,
        activeOrders,
        activeOrdersGrowth: Math.round(activeOrdersGrowth * 10) / 10,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
