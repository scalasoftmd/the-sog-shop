interface Event {
	image: string;
	pastorImage: string;
	title: string;
	description: string;
	location: string;
	date: string;
	price: string;
	ticketLink: string;
}

interface EventsProductSectionProps {
	events: Event[];
	title?: string;
	subtitle?: string;
}

const EventsProductSection = ({
	events,
	title = 'Events',
	subtitle = 'Tickets & Trainings',
}: EventsProductSectionProps) => {
	return (
		<section className="md:pb-30 px-10 pb-30 md:px-40 bg-white">
			<h2 className="text-3xl font-bold mb-2">
				{title}{' '}
				<span className="text-gray-400 text-lg font-normal hidden md:inline-block">
					{subtitle}
				</span>
			</h2>
			<div className="space-y-8">
				{events.map((event, idx) => (
					<div
						className="border bg-black text-white"
						key={idx}
					>
						<div className="flex flex-row items-stretch">
							<img
								src={event.pastorImage}
								alt="Pastor"
								className="hidden md:block w-50 h-50 object-cover"
							/>
							<img
								src={event.image}
								alt={event.title}
								className="w-30 h-50 object-cover"
							/>
							<div className="flex-1 p-6 flex flex-col justify-center">
								<h3 className="text-xl font-bold mb-2">
									{event.title}
								</h3>
								<p className="text-sm leading-relaxed">
									{event.description}
								</p>
							</div>
						</div>
						<div className="bg-gray-100 text-black px-6 py-4">
							<div className="flex flex-row justify-between items-center w-full">
								<div>
									<span>{event.location}, {event.date}</span>
									<br />
									<span className="font-bold">
										{getSpeakerAndTopic(event.title)}
									</span>
								</div>
								<div className="flex flex-col items-end">
									<span className="font-bold text-lg">{event.price}</span>
									<a href={event.ticketLink} className="text-blue-600 font-semibold hover:underline">Tickets &gt;</a>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default EventsProductSection;

// Helper function to extract speaker and topic
function getSpeakerAndTopic(title: string) {
  const dashIdx = title.indexOf(' - ');
  if (dashIdx !== -1) {
    return title;
  }
  return title;
}