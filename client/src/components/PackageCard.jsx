import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { Badge } from "./ui/badge"

export function PackageCard({ pkg, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative flex flex-col rounded-2xl border p-8 shadow-sm hover:shadow-xl transition-all duration-300 ${pkg.popular
                    ? "border-secondary ring-2 ring-secondary/20 bg-gradient-to-b from-white to-secondary/5"
                    : "bg-white"
                }`}
        >
            {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-secondary text-primary font-semibold px-4 py-1">
                        Most Popular
                    </Badge>
                </div>
            )}

            <div className="text-center mb-6">
                <h3 className="text-xl font-serif font-semibold text-primary">
                    {pkg.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-2">
                    {pkg.description}
                </p>
            </div>

            <div className="text-left mb-8">
                <span className="text-sm font-serif font-bold text-primary">
                    {pkg.price}
                </span>
            </div>

            <ul className="space-y-4 flex-1 ">
                {pkg.features?.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-secondary mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                ))}
            </ul>

             <div className="text-center mb-8">
                <span className="text-sm text-primary">
                    {pkg.bestFor}
                </span>
            </div>

            <button
                className={`mt-8 w-full py-3 rounded-lg font-semibold transition-all duration-300 ${pkg.popular
                        ? "bg-secondary text-primary hover:bg-secondary/90"
                        : "bg-primary text-white hover:bg-primary/90"
                    }`}
            >
                Get Started
            </button>
        </motion.div>
    )
}
